"use client";

import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
  parseISO,
} from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
  MapPin,
  AlignLeft,
  X,
  Trash2,
  Edit2,
  Clock,
  Sparkles,
  Check,
} from "lucide-react";
import type { CalendarEvent } from "@/services/calendar.service";
import {
  createCalendarEventAction,
  updateCalendarEventAction,
  deleteCalendarEventAction,
} from "@/actions/calendar.action";
import { useRouter } from "next/navigation";

interface CalendarPreviewProps {
  events: CalendarEvent[];
}

export default function CalendarPreview({ events }: CalendarPreviewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const router = useRouter();

  // Create event form state
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Grid Calculations
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    setSummary("");
    setDescription("");
    setLocation("");
    setStartTime("09:00");
    setEndTime("10:00");
    setIsCreateModalOpen(true);
    setIsEditMode(false);
    setError("");
  };

  const handleEventClick = (event: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setSummary(event.title);
    setDescription(event.description || "");
    setLocation(event.location || "");
    
    // Parse time if start/end are set
    if (event.start) {
      const date = new Date(event.start);
      setStartTime(format(date, "HH:mm"));
    }
    if (event.end) {
      const date = new Date(event.end);
      setEndTime(format(date, "HH:mm"));
    }
    setIsEditMode(false);
    setError("");
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !summary.trim() || loading) return;

    setLoading(true);
    setError("");

    try {
      const startDateTime = new Date(selectedDate);
      const [sh, sm] = startTime.split(":");
      startDateTime.setHours(parseInt(sh), parseInt(sm), 0, 0);

      const endDateTime = new Date(selectedDate);
      const [eh, em] = endTime.split(":");
      endDateTime.setHours(parseInt(eh), parseInt(em), 0, 0);

      const res = await createCalendarEventAction({
        summary,
        description,
        location,
        start: startDateTime.toISOString(),
        end: endDateTime.toISOString(),
      });

      if (res.success) {
        setIsCreateModalOpen(false);
        router.refresh();
      } else {
        setError(res.error || "Failed to create event");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent || !summary.trim() || loading) return;

    setLoading(true);
    setError("");

    try {
      const eventDate = selectedEvent.start ? new Date(selectedEvent.start) : new Date();
      
      const startDateTime = new Date(eventDate);
      const [sh, sm] = startTime.split(":");
      startDateTime.setHours(parseInt(sh), parseInt(sm), 0, 0);

      const endDateTime = new Date(eventDate);
      const [eh, em] = endTime.split(":");
      endDateTime.setHours(parseInt(eh), parseInt(em), 0, 0);

      const res = await updateCalendarEventAction(selectedEvent.id, {
        summary,
        description,
        location,
        start: { dateTime: startDateTime.toISOString() },
        end: { dateTime: endDateTime.toISOString() },
      });

      if (res.success) {
        setSelectedEvent(null);
        router.refresh();
      } else {
        setError(res.error || "Failed to update event");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (loading) return;

    if (!confirm("Are you sure you want to delete this event?")) return;

    setLoading(true);
    setError("");

    try {
      const res = await deleteCalendarEventAction(eventId);
      if (res.success) {
        setSelectedEvent(null);
        router.refresh();
      } else {
        setError(res.error || "Failed to delete event");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl">
      {/* Month Toolbar Header */}
      <div className="flex items-center justify-between border-b border-white/10 p-5 bg-white/[0.02]">
        <div className="flex items-center gap-4">
          <CalendarIcon className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-bold text-white tracking-wide">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="rounded-lg p-1.5 border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setCurrentMonth(new Date())}
            className="px-3 py-1 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-white/80 hover:text-white transition-colors"
          >
            Today
          </button>
          <button
            onClick={nextMonth}
            className="rounded-lg p-1.5 border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Weekday Labels Header */}
      <div className="grid grid-cols-7 border-b border-white/5 bg-white/[0.01] text-center text-[10px] font-bold tracking-wider text-white/40 uppercase py-2">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 grid grid-cols-7 grid-rows-5 bg-white/[0.01]">
        {days.map((day, dayIdx) => {
          const dayEvents = events.filter((event) =>
            event.start ? isSameDay(new Date(event.start), day) : false
          );
          const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
          const today = isToday(day);

          return (
            <div
              key={day.toString()}
              onClick={() => handleDayClick(day)}
              className={`
                min-h-[70px]
                border-r border-b border-white/5
                p-2
                cursor-pointer
                transition-all
                hover:bg-white/[0.03]
                flex flex-col
                relative
                ${isCurrentMonth ? "text-white" : "text-white/20"}
                ${day.getDay() === 6 ? "border-r-0" : ""}
                ${dayIdx >= 28 ? "border-b-0" : ""}
              `}
            >
              {/* Day Number */}
              <div className="flex items-center justify-between">
                <span
                  className={`
                    text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center
                    ${
                      today
                        ? "bg-primary text-white"
                        : isCurrentMonth
                        ? "text-white/80"
                        : "text-white/25"
                    }
                  `}
                >
                  {format(day, "d")}
                </span>
              </div>

              {/* Event Tags inside Day Cell */}
              <div className="mt-1 space-y-1 flex-1 overflow-y-auto no-scrollbar max-h-[80px]">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    onClick={(e) => handleEventClick(event, e)}
                    className="
                      text-[9px]
                      font-medium
                      bg-primary/20
                      border border-primary/30
                      text-primary-light
                      px-1.5 py-0.5
                      rounded-md
                      truncate
                      hover:bg-primary/30
                      transition-all
                    "
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-[8px] font-bold text-white/30 pl-1">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE EVENT MODAL */}
      {isCreateModalOpen && selectedDate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0e0e0e] p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <h3 className="text-md font-bold text-white">Create New Event</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-white/40 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {error && (
              <div className="mb-4 text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-2.5 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase text-white/40">Title</label>
                <input
                  required
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Event Title"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase text-white/40">Start Time</label>
                  <input
                    type="time"
                    required
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-white/40">End Time</label>
                  <input
                    type="time"
                    required
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-white/40">Location</label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Add Location"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-white/40">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add Description"
                  rows={3}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-white/80 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-xl bg-primary hover:opacity-90 text-xs font-semibold text-white transition-all disabled:opacity-40"
                >
                  {loading ? "Creating..." : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EVENT DETAILS / EDIT MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0e0e0e] p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <h3 className="text-md font-bold text-white">
                {isEditMode ? "Edit Event" : "Event Details"}
              </h3>
              <div className="flex items-center gap-2">
                {!isEditMode && (
                  <>
                    <button
                      onClick={() => setIsEditMode(true)}
                      className="text-white/40 hover:text-white hover:bg-white/5 p-1.5 rounded-lg transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(selectedEvent.id)}
                      className="text-white/40 hover:text-red-400 hover:bg-red-500/10 p-1.5 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </>
                )}
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-2.5 rounded-lg">
                {error}
              </div>
            )}

            {isEditMode ? (
              <form onSubmit={handleUpdateEvent} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold uppercase text-white/40">Title</label>
                  <input
                    required
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-white/40">Start Time</label>
                    <input
                      type="time"
                      required
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-white/40">End Time</label>
                    <input
                      type="time"
                      required
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-white/40">Location</label>
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Add Location"
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-white/40">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add Description"
                    rows={3}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white outline-none focus:border-primary resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditMode(false)}
                    className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-white/80 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 rounded-xl bg-primary hover:opacity-90 text-xs font-semibold text-white transition-all disabled:opacity-40"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-white">{selectedEvent.title}</h4>
                </div>

                {/* Date & Time */}
                {selectedEvent.start && (
                  <div className="flex items-start gap-2.5 text-xs text-white/70">
                    <Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span>{format(new Date(selectedEvent.start), "EEEE, MMMM d, yyyy")}</span>
                      <span className="text-white/40 mt-0.5">
                        {format(new Date(selectedEvent.start), "HH:mm")}
                        {selectedEvent.end && ` - ${format(new Date(selectedEvent.end), "HH:mm")}`}
                      </span>
                    </div>
                  </div>
                )}

                {/* Location */}
                {selectedEvent.location && (
                  <div className="flex items-center gap-2.5 text-xs text-white/70">
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    <span>{selectedEvent.location}</span>
                  </div>
                )}

                {/* Description */}
                {selectedEvent.description && (
                  <div className="flex items-start gap-2.5 text-xs text-white/70 border-t border-white/5 pt-3 mt-3">
                    <AlignLeft className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <p className="leading-relaxed whitespace-pre-wrap">{selectedEvent.description}</p>
                  </div>
                )}

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-white/85 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
import { corsair } from "@/server/corsair";

export type CalendarEvent = {
  id: string;
  title: string;
  description?: string;
  start?: Date | string | null;
  end?: Date | string | null;
  location?: string;
};

function mapEvent(event: any): CalendarEvent {
  return {
    id: event.entity_id,
    title:
      event.data?.summary ??
      event.data?.title ??
      "Untitled Event",
    description: event.data?.description,
    start:
      event.data?.start?.dateTime ??
      event.data?.start?.date,
    end:
      event.data?.end?.dateTime ??
      event.data?.end?.date,
    location: event.data?.location,
  };
}

export async function searchEvents(
  tenantId: string,
  query: string,
  limit = 10
): Promise<CalendarEvent[]> {
  if (!query.trim()) return [];

  const events = await corsair
    .withTenant(tenantId)
    .googlecalendar
    .db
    .events
    .search({
      data: {
        summary: {
          contains: query,
        },
      },
    });

  return events
    .slice(0, limit)
    .map(mapEvent);
}

export async function getUpcomingEvents(
  tenantId: string,
  limit = 20
): Promise<CalendarEvent[]> {
  const events = await corsair
    .withTenant(tenantId)
    .googlecalendar
    .db
    .events
    .list();

  const now = Date.now();

  return events
    .filter((event: any) => {
      const start =
        event.data?.start?.dateTime ??
        event.data?.start?.date;

      return (
        start &&
        new Date(start).getTime() >= now
      );
    })
    .sort(
      (a: any, b: any) =>
        new Date(
          a.data?.start?.dateTime ??
            a.data?.start?.date
        ).getTime() -
        new Date(
          b.data?.start?.dateTime ??
            b.data?.start?.date
        ).getTime()
    )
    .slice(0, limit)
    .map(mapEvent);
}

export async function getAllEvents(
  tenantId: string,
  limit = 100
): Promise<CalendarEvent[]> {
  const events = await corsair
    .withTenant(tenantId)
    .googlecalendar
    .db
    .events
    .list();

  return events
    .sort(
      (a: any, b: any) =>
        new Date(
          a.data?.start?.dateTime ??
            a.data?.start?.date ?? 0
        ).getTime() -
        new Date(
          b.data?.start?.dateTime ??
            b.data?.start?.date ?? 0
        ).getTime()
    )
    .slice(0, limit)
    .map(mapEvent);
}

export async function getTodaysEvents(
  tenantId: string
): Promise<CalendarEvent[]> {
  const events = await getUpcomingEvents(
    tenantId,
    100
  );

  const today = new Date();

  return events.filter((event) => {
    if (!event.start) return false;

    const date = new Date(event.start);

    return (
      date.getFullYear() ===
        today.getFullYear() &&
      date.getMonth() ===
        today.getMonth() &&
      date.getDate() ===
        today.getDate()
    );
  });
}

export async function getEventById(
  tenantId: string,
  eventId: string
): Promise<CalendarEvent | null> {
  const events = await corsair
    .withTenant(tenantId)
    .googlecalendar
    .db
    .events
    .search({
      data: {
        id: eventId,
      },
    });

  if (!events.length) {
    return null;
  }

  return mapEvent(events[0]);
}

export async function createEvent(
  tenantId: string,
  payload: {
    summary: string;
    start: string;
    end: string;
    description?: string;
    location?: string;
  }
) {
  return corsair
    .withTenant(tenantId)
    .googlecalendar
    .api
    .events
    .create({
      event: {
        summary: payload.summary,
        description: payload.description,
        location: payload.location,
        start: {
          dateTime: payload.start,
        },
        end: {
          dateTime: payload.end,
        },
      },
    });
}

export async function updateEvent(
  tenantId: string,
  eventId: string,
  updates: Record<string, unknown>
) {
  return corsair
    .withTenant(tenantId)
    .googlecalendar
    .api
    .events
    .update({
      id: eventId,
      event: updates,
    });
}

export async function deleteEvent(
  tenantId: string,
  eventId: string
) {
  return corsair
    .withTenant(tenantId)
    .googlecalendar
    .api
    .events
    .delete({
      id: eventId,
    });
}
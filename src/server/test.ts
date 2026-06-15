
// const main = async () =>  {
//     // const res = await corsair.withTenant("dev").gmail.api.threads.list({})
//     // const res = await corsair.withTenant("dev").gmail.db.threads.list({})
//     const res = await corsair.withTenant("dev").gmail.db.threads.search({
//         data:{
//             snippet:{
//                 contains: "Mobbin"
//             }
//         }
//     })


//     console.log(res)
// }

// const main = async () =>  {
//     // const res = await corsair.withTenant("dev").googlecalendar.api.events.create({
//     //     event:{attendees :{

//     //     }}
//     // })


//     console.log(res)
// }

// main()

// so a lot of things you can do here --- make it worth
// now you can easily wire up the api route to see the user's client and create events 

// import { searchEmails } from "@/services/email.service";

// async function main() {
//   const results = await searchEmails(
//     "dev",
//     "Mobbin"
//   );

//   console.log(results);
// }

// main();

import { runAssistant }
from "@/services/assistant.service";

async function main() {
  const result =
    await runAssistant(
      "dev",
      "Find emails about Mobbin"
    );

  console.log(result);
}

main();
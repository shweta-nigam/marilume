
import { corsair } from "./corsair";

async function test() {
  const results = await corsair
    .withTenant("dev")
    .gmail
    .db
    .threads
    .search({
      data: {},
    });

    
console.log(
    "TOTAL THREADS:",
    results.length
  );

  console.log(results.slice(0, 5));
}

test();
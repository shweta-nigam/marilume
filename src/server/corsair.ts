import 'dotenv/config';
import { Pool } from 'pg';
import { createCorsair } from 'corsair';
import { gmail } from '@corsair-dev/gmail';
import { googlecalendar } from '@corsair-dev/googlecalendar';

const db = new Pool({ connectionString: process.env.DATABASE_URL });

export const corsair = createCorsair({
    plugins: [gmail(), googlecalendar()],
    database: db,
    kek: process.env.CORSAIR_KEK!,
    multiTenancy: true,  // //every user/workspace needs its own tenantId, and Gmail/Calendar accounts are stored separately per tenant.
});


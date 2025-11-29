import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import multipart from '@fastify/multipart';
import { prisma } from '@repo/database';

const server = Fastify({
    logger: true
});

server.register(cors, {
    origin: '*'
});

server.register(jwt, {
    secret: process.env.JWT_SECRET || 'supersecret'
});

server.register(multipart);

// Auth Middleware
server.decorate("authenticate", async function (request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify();
    } catch (err) {
        reply.send(err);
    }
});

server.get('/health', async (request, reply) => {
    return { status: 'ok' };
});

// Login Endpoint
server.post('/login', async (request, reply) => {
    const { email, password } = request.body as any;
    // In a real app, verify password hash
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.password !== password) { // simplified check
        return reply.status(401).send({ error: 'Invalid credentials' });
    }

    const token = server.jwt.sign({ id: user.id, email: user.email, role: user.role });
    return { token };
});

// Protected Routes
server.register(async function (protectedRoutes) {
    protectedRoutes.addHook("onRequest", protectedRoutes.authenticate);

    // Mock Dashboard Stats
    protectedRoutes.get('/dashboard/stats', async (request, reply) => {
        return {
            totalAum: '$125.4M',
            pendingInvoices: 15,
            activeClients: 48,
            recentActivity: [
                { description: 'Statement uploaded for Client A', time: '5 mins ago' },
                { description: 'Invoice generated for Client B', time: '2 hours ago' }
            ]
        };
    });

    // Mock Statements List
    protectedRoutes.get('/statements', async (request, reply) => {
        // In real app, fetch from DB
        return [
            { id: '1', fileName: 'schwab_oct_2023.pdf', custodian: 'Schwab', status: 'PROCESSED' },
            { id: '2', fileName: 'fidelity_nov_2023.pdf', custodian: 'Fidelity', status: 'PENDING' }
        ];
    });

    // Mock Upload
    protectedRoutes.post('/statements/upload', async (request, reply) => {
        const data = await request.file();
        if (!data) {
            return reply.status(400).send({ error: 'No file uploaded' });
        }
        // In real app, save file and trigger parsing
        console.log('Received file:', data.filename);
        return { status: 'uploaded', fileName: data.filename };
    });
});

const start = async () => {
    try {
        await server.listen({ port: 3001, host: '0.0.0.0' });
        console.log('Server listening on http://localhost:3001');
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();

// Add type declaration for authenticate
declare module "fastify" {
    export interface FastifyInstance {
        authenticate: any;
    }
}

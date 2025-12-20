import { DependencyInjection } from '@/core/di/index.js';
import { ApiClient } from '@/core/api-client';

DependencyInjection.register('ApiClient', ApiClient, [], [process.env.REST_API_URL ?? '/']);

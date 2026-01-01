import { DependencyInjection } from '@/core/di/index.js';
import { ApiClient } from '@/core/api-client';
import { ValidationProvider } from '@/core/services';

DependencyInjection.register('ApiClient', ApiClient, [], [process.env.REST_API_URL ?? '/']);
DependencyInjection.register('ValidationProvider', ValidationProvider);

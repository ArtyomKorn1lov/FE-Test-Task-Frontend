import { DependencyInjection } from '@/core/di/index.js';
import { EnvService } from '@/core/utils';
import { ApiClient } from '@/core/api-client';

DependencyInjection.register('ApiClient', ApiClient, [], [EnvService.get('REST_API_URL') ?? '/']);

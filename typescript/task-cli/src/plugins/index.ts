// src/plugins/index.ts
export interface TaskPlugin {
  name: string;
  version: string;
  commands?: PluginCommand[];
  hooks?: PluginHooks;
}

export interface PluginCommand {
  name: string;
  description: string;
  handler: CommandHandler;
}

// plugins/reporting/index.ts
// plugins/github-sync/index.ts

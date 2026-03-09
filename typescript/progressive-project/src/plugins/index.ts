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

export type CommandHandler = (...args: any[]) => Promise<void>;

export interface PluginHooks {}

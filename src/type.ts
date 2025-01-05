export interface ChatItem {
  type: number;
  author: Author;
  content: string;
  mentions: Mention[];
  attachments: Attachment[];
  message_reference?: {
    type: number;
    channel_id: string;
    message_id: string;
    guild_id: string;
  };
  timestamp: string;
  edited_timestamp: string;
  flags: number;
  id: string;
  channel_id: string;
}

export interface Author {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  flags: number;
  banner: string;
  accent_color: string;
  global_name: string;
  avatar_decoration_data: any;
  banner_color: string;
  clan: string;
  primary_guild: string;
}

export interface Mention {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  flags: number;
  banner: string;
  accent_color: string;
  global_name: string;
  avatar_decoration_data: any;
  banner_color: string;
  clan: string;
  primary_guild: string;
}

export interface Attachment {
  id: string;
  filename: string;
  size: number;
  url: string;
  proxy_url: string;
  width: number;
  height: number;
  content_type: string;
  content_scan_version: number;
  placeholder: string;
  placeholder_version: number;
}

export interface Reference {
  type: number;
  channel_id: string;
  message_id: string;
  guild_id: string;
}

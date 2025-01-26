export interface AgendaItem {
  EventItemId: string;
  EventItemAgendaNumber: string | null;
  EventItemTitle: string;
  EventItemAgendaSequence: number | null;
  EventItemMatterId: string | null;
  Attachments: Attachment[];
  Votes: Vote[];
  MatterHistory: MatterHistory[];
}

export interface Attachment {
  MatterAttachmentName: string;
  MatterAttachmentHyperlink: string;
  MatterAttachmentFileName: string;
}

export interface Vote {
  VotePersonName: string;
  VoteValueName: string;
}

export interface MatterHistory {
  MatterHistoryActionName: string;
  MatterHistoryActionText: string;
  MatterHistoryMoverName: string;
  MatterHistoryPassedFlagName: string;
  MatterHistorySeconderName: string;
} 
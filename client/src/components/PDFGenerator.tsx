import { Document, Page, Text, View, StyleSheet, BlobProvider, Font } from '@react-pdf/renderer';
import type { AgendaItem } from '../types';
import React from 'react';

// Register a font (optional)
Font.register({
  family: 'Open Sans',
  src: 'https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf',
});

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Open Sans',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
    color: '#2563eb',
  },
  meetingDate: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    color: '#6b7280',
  },
  item: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8fafc',
    borderRadius: 4,
  },
  itemHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  itemNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  text: {
    fontSize: 12,
    lineHeight: 1.5,
  },
  votes: {
    marginTop: 10,
  },
  vote: {
    fontSize: 10,
    marginBottom: 2,
  },
  outcome: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1f2937',
  },
  attachments: {
    marginTop: 10,
  },
  link: {
    fontSize: 10,
    color: '#2563eb',
    textDecoration: 'underline',
    marginBottom: 2,
  },
});

interface AgendaPDFProps {
  items: AgendaItem[];
  meetingDate: string;
}

const AgendaPDF = ({ items, meetingDate }: AgendaPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Commissioners Court Items of Interest</Text>
      <Text style={styles.meetingDate}>{meetingDate}</Text>
      {items.map((item) => (
        <View key={item.EventItemId} style={styles.item}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemNumber}>
              {item.EventItemAgendaNumber ? `Item #${item.EventItemAgendaNumber}` : 'No Item Number'}
            </Text>
          </View>
          <Text style={styles.text}>{item.EventItemTitle}</Text>
          {item.Attachments.length > 0 && (
            <View style={styles.attachments}>
              <Text style={styles.sectionTitle}>Attachments:</Text>
              {item.Attachments.map((attachment, index) => (
                <Text key={index} style={styles.link}>
                  {attachment.MatterAttachmentName}
                  {' - '}
                  {attachment.MatterAttachmentHyperlink}
                </Text>
              ))}
            </View>
          )}
          {item.Votes.length > 0 && (
            <View style={styles.votes}>
              <Text style={styles.sectionTitle}>Votes:</Text>
              {item.Votes.map((vote, index) => (
                <Text 
                  key={index} 
                  style={[
                    styles.vote,
                    { color: vote.VoteValueName === 'Aye' ? '#16a34a' : '#dc2626' }
                  ]}
                >
                  {vote.VotePersonName}: {vote.VoteValueName}
                </Text>
              ))}
            </View>
          )}
          {item.MatterHistory.length > 0 && (
            <View style={styles.outcome}>
              <Text style={styles.sectionTitle}>Outcome:</Text>
              <Text style={styles.text}>
                {item.MatterHistory[0].MatterHistoryPassedFlagName || 
                 item.MatterHistory[0].MatterHistoryActionName}
              </Text>
            </View>
          )}
        </View>
      ))}
    </Page>
  </Document>
);

interface PDFDownloadButtonProps {
  selectedItems: AgendaItem[];
  meetingDate: string;
}

export const PDFDownloadButton = ({ selectedItems, meetingDate }: PDFDownloadButtonProps) => (
  <BlobProvider document={<AgendaPDF items={selectedItems} meetingDate={meetingDate} />}>
    {({ blob, url, loading, error }) => {
      if (loading) {
        return (
          <button
            className="fixed bottom-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg opacity-50 cursor-not-allowed"
            disabled
          >
            Generating PDF...
          </button>
        );
      }

      if (error) {
        return (
          <div className="fixed bottom-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg">
            Error generating PDF
          </div>
        );
      }

      return (
        <a
          href={url!}
          download="commissioners-court-items.pdf"
          className="fixed bottom-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
        >
          Download Selected Items (PDF)
        </a>
      );
    }}
  </BlobProvider>
);
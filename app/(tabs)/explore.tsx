import { Platform, StyleSheet } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function explore() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0E8FF', dark: '#1A2E45' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#4A90D9"
          name="questionmark.circle"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          FAQs
        </ThemedText>
      </ThemedView>
      <ThemedText>
        Got questions about using the Job Tracker? We've got you covered.
      </ThemedText>

      <Collapsible title="How do I add a job?">
        <ThemedText>
          Tap the <ThemedText type="defaultSemiBold">+ Add Job</ThemedText> button on the home
          screen. Fill in the job title, company name, and any other details like the posting URL or
          notes. Hit <ThemedText type="defaultSemiBold">Save</ThemedText> and it will appear in your
          job list instantly.
        </ThemedText>
      </Collapsible>

      <Collapsible title="How do I track application status?">
        <ThemedText>
          Each job entry has a <ThemedText type="defaultSemiBold">Status</ThemedText> field you can
          update at any time. Available statuses include:
        </ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.statusItem}>
          🟡 Applied
        </ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.statusItem}>
          🔵 Interview Scheduled
        </ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.statusItem}>
          🟢 Offer Received
        </ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.statusItem}>
          🔴 Rejected
        </ThemedText>
        <ThemedText style={styles.statusNote}>
          Tap on a job card and select{' '}
          <ThemedText type="defaultSemiBold">Edit</ThemedText> to update the status as your
          application progresses.
        </ThemedText>
      </Collapsible>

      <Collapsible title="How do I filter or search jobs?">
        <ThemedText>
          Use the <ThemedText type="defaultSemiBold">Search bar</ThemedText> at the top of the job
          list to find jobs by company name or job title. You can also use the{' '}
          <ThemedText type="defaultSemiBold">Filter</ThemedText> button to narrow results by status
          (e.g., show only "Interview Scheduled" jobs).
        </ThemedText>
      </Collapsible>

      <Collapsible title="Is my data saved and synced?">
        <ThemedText>
          Yes! Your job entries are saved{' '}
          <ThemedText type="defaultSemiBold">automatically</ThemedText> on your device. If you're
          signed in with an account, your data is also synced to the cloud so you can access it
          across multiple devices without losing any entries.
        </ThemedText>
      </Collapsible>

      <Collapsible title="How do I delete a job entry?">
        <ThemedText>
          To delete a job, swipe left on the job card in the list and tap{' '}
          <ThemedText type="defaultSemiBold">Delete</ThemedText>. Alternatively, open the job
          detail view, tap the{' '}
          <ThemedText type="defaultSemiBold">⋯ menu</ThemedText> in the top right, and select{' '}
          <ThemedText type="defaultSemiBold">Delete Job</ThemedText>. This action cannot be undone.
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#4A90D9',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  statusItem: {
    marginTop: 4,
    marginLeft: 8,
  },
  statusNote: {
    marginTop: 8,
  },
});
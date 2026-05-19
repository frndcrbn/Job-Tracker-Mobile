import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

type Job = {
  id: string;
  company: string;
  position: string;
  status: string;
};

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("Applied");

  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const [filter, setFilter] = useState("All");

  const filteredJobs = filter === "All" ? jobs : jobs.filter((job) => job.status === filter);

  const startEdit = (job: Job) => {
    setEditingJob(job);
    setCompany(job.company);
    setPosition(job.position);
    setStatus(job.status);
  };
  // LOAD DATA ON START
  useEffect(() => {
    const loadJobs = async () => {
      const data = await AsyncStorage.getItem("jobs");

      if (data) {
        setJobs(JSON.parse(data));
      } else {
        setJobs([]);
      }
    }
    loadJobs();
  }, []);

  // SAVE EVERY CHANGE
  const saveJobs = async (items: Job[]) => {
    try {
      await AsyncStorage.setItem("jobs", JSON.stringify(items));
    } catch (e) {
      console.log("Save error:", e);
    }
  };

  const addJob = () => {
    if (!company || !position) return;

    if (editingJob) {
      // Update existing job
      const updateJobs = jobs.map((job) =>
        job.id === editingJob.id ? { ...job, company, position, status } : job
      );

      setJobs(updateJobs);
      saveJobs(updateJobs);
      setEditingJob(null);
    } else {
      const newJob: Job = {
        id: Date.now().toString(),
        company,
        position,
        status,
      };
      
      const updated = [newJob, ...jobs];
      setJobs(updated);
      saveJobs(updated);
    }
    
    setCompany("");
    setPosition("");
    setStatus("Applied");
  };

  const deleteJob = (id: string) => {
    const updated = jobs.filter((job) => job.id !== id);
    setJobs(updated);
    saveJobs(updated);
  };

  const clearJobs = async () => {
    setJobs([]);
    await AsyncStorage.removeItem("jobs");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💼 Job Tracker</Text>
      {/* STATS */}
      <View style={styles.statsRow}>
        <View style={styles.statsCard}>
          <Text style={styles.statsNumber}>{jobs.length}</Text>
          <Text style={styles.statsLabel}>Total</Text>
        </View>
        
        <View style={styles.statsCard}>
          <Text style={styles.statsNumber}>
            {jobs.filter((j) => j.status === "Applied").length}
          </Text>
          <Text style={styles.statsLabel}>
            Applied
          </Text>
        </View>
        
        <View style={styles.statsCard}>
          <Text style={styles.statsNumber}>
            {jobs.filter((j) => j.status === "Interview").length}
          </Text>
          <Text style={styles.statsLabel}>
            Interview
          </Text>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.statsNumber}>
            {jobs.filter((j) => j.status === "Offer").length}
          </Text>
          <Text style={styles.statsLabel}>
            Offer
          </Text>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.statsNumber}>
            {jobs.filter((j) => j.status === "Rejected").length}
          </Text>
          <Text style={styles.statsLabel}>
            Rejected
          </Text>
        </View>
      </View>
      <TextInput
        placeholder="Company"
        placeholderTextColor="#94a3b8"
        value={company}
        onChangeText={setCompany}
        style={styles.input}
      />

      <TextInput
        placeholder="Position"
        placeholderTextColor="#94a3b8"
        value={position}
        onChangeText={setPosition}
        style={styles.input}
      />

      {/* STATUS PICKER */}
      <View style={styles.statusRow}>
        {["Applied", "Interview", "Offer", "Rejected"].map((item) => (
          <Pressable
            key={item}
            onPress={() => setStatus(item)}
            style={[
              styles.statusBtn,
              status === item && styles.activeStatusBtn,
            ]}
          >
            <Text style={styles.statusText}>{item}</Text>
          </Pressable>
        ))}
      </View>

      {/* ADD BUTTON */}
      <Pressable style={styles.button} onPress={addJob}>
        <Text style={styles.buttonText}>
          {editingJob ? "Update" : "Add"}
        </Text>
      </Pressable>
      
      {/* FILTERS */}
      <View style={styles.filterRow}>
        {["All", "Applied", "Interview", "Offer", "Rejected"].map((item) => (
          <Pressable
            key={item}
            onPress={() => setFilter(item)}
            style={[
              styles.filterBtn,
              filter === item && styles.activeFilter,
            ]}
          >
            <Text style={{ color: "white" }}>{item}</Text>
          </Pressable>
        ))}
      </View>
      {/* JOB LIST */}
      <FlatList<Job>
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>          
            <View style={{ flex: 1}}>
              <Text style={styles.company}>{item.company}</Text>
              <Text style={styles.position}>{item.position}</Text>

              <View
                style={[
                  styles.badge,
                  item.status === "Applied" && styles.badgeApplied,
                  item.status === "Interview" && styles.badgeInterview,
                  item.status === "Offer" && styles.badgeOffer,
                  item.status === "Rejected" && styles.badgeRejected,
                ]}
              >
                <Text style={styles.badgeText}>{item.status}</Text>
              </View>              
            </View>

            <View style={styles.actionColumn}>
              <Pressable onPress={() => startEdit(item)}>
                <Text style={styles.editText}>Edit</Text>
              </Pressable>

              <Pressable onPress={() => deleteJob(item.id)}>
                <Text style={styles.deleteText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  statsCard: {
    flex: 1,
    backgroundColor: "#1e293b",
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: "center",
  },
  statsNumber: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  statsLabel: {
    color: "#94a3b8",
    fontSize: 7.2,
    marginTop: 4,
  },
  statusRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  activeStatusBtn: {
    backgroundColor: "#4f46e5",
  },
  statusText: {
    color: "white",
    fontSize: 11,
    textAlign: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  filterText: {
    color: "white",
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginTop: 4,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  badgeApplied: {
    backgroundColor: "#3b82f6",
  },
  badgeInterview: {
    backgroundColor: "#f59e0b",
  },
  badgeOffer: {
    backgroundColor: "#22c55e",
  },
  badgeRejected: {
    backgroundColor: "#ef4444",
  },
  actionColumn: {
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  editText: {
    color: "#f59e0b",
    fontWeight: "bold",
    marginBottom: 10,
  },
  deleteText: {
    color: "#ef4444",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
    paddingTop: 60,
  },
  filterBtn: {
    padding: 8,
    backgroundColor: "#1e293b",
    marginRight: 6,
    marginBottom: 6,
    borderRadius: 6,
  },
  activeFilter: {
    backgroundColor: "#4f46e5",
  },
  statusBtn: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#334155",
    marginBottom: 6,
  },
  activeApplied: {
    backgroundColor: "#3b82f6",
  },
  activeInterview: {
    backgroundColor: "#f59e0b",
  },
  activeOffer: {
    backgroundColor: "#22c55e",
  },
  activeRejected: {
    backgroundColor: "#ef4444",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#1e293b",
    padding: 12,
    borderRadius: 8,
    color: "white",
    marginBottom: 10,
  },
  editBtn: {
    backgroundColor: "#f59e0b",
    padding: 6,
    borderRadius: 6,
  },
  button: {
    backgroundColor: "#4f46e5",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#1e293b",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  company: {
    color: "white",
    fontWeight: "bold",
  },
  position: {
    color: "#94a3b8",
  },
});
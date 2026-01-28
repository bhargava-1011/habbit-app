import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { scheduleHabitReminder, requestNotificationPermissions } from "./notificationUtils";

// Ocean Breeze palette (selected): clean, fresh — balanced contrast
const PALETTE = {
  background: "#F7FBFF", // page background
  surface: "#FFFFFF",
  primary: "#2D8CFF", // CTA, primary buttons
  secondary: "#06B6D4", // tabs, highlights
  accent: "#FFB020", // badges, small accents
  success: "#10B981",
  danger: "#E74C3C",
  muted: "#94A3B8", // subtle text/borders
  textPrimary: "#0F172A",
  textSecondary: "#475569",
  cardDefault: "#2563EB",
  subtleBg: "#F1F5F9",
};
const Index = () => {
  const [option, setOption] = useState("Today");
  const router = useRouter();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);

  // Determine API base URL based on platform
  const getApiBase = () => {
    // For web deployment, use environment variable or production URL
    if (Platform.OS === "web") {
      return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    }
    if (Platform.OS === "android") {
      return "http://10.0.2.2:3000";
    }
    // iOS and other platforms
    return "http://192.168.31.242:3000";
  };

  useEffect(() => {
    fetchhabits();
    // Request notification permissions on mount
    requestNotificationPermissions();
  }, []);

  // Schedule notifications when habits are loaded
  useEffect(() => {
    if (habits.length > 0) {
      habits.forEach(habit => {
        if (habit.reminder && habit.reminderTime) {
          scheduleHabitReminder(habit);
        }
      });
    }
  }, [habits]);

  const fetchhabits = async () => {
    try {
      setLoading(true);
      const apiBase = getApiBase();
      const url = `${apiBase}/habitslist`;
      console.log("Fetching habits from:", url);

      const response = await axios.get(url, { timeout: 5000 });
      console.log("Habits response:", response.data);

      // Backend returns array directly
      if (Array.isArray(response.data)) {
        setHabits(response.data);
        console.log("Habits loaded successfully:", response.data);
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        // Fallback for old format
        setHabits(response.data.data);
        console.log("Habits loaded successfully (old format):", response.data.data);
      } else {
        console.warn("Unexpected response format:", response.data);
        setHabits([]);
      }
    } catch (error) {
      console.error("Error fetching habits:", error.message);
      setHabits([]);
    } finally {
      setLoading(false);
    }
  };
  console.log("habits", habits);

  // Handle habit actions
  const handleComplete = async () => {
    if (!selectedHabit) return;
    try {
      const apiBase = getApiBase();
      const today = new Date().toISOString().split("T")[0];
      await axios.put(
        `${apiBase}/habits/${selectedHabit._id}/completed/${today}`
      );
      console.log("Habit marked as completed");
      fetchhabits(); // Refresh list
      setModalVisible(false);
    } catch (error) {
      console.error("Error completing habit:", error);
    }
  };

  const handleEdit = () => {
    if (!selectedHabit) return;
    // Navigate to edit screen with habit ID
    router.push({
      pathname: "/home/create",
      params: { habitId: selectedHabit._id },
    });
    setModalVisible(false);
  };

  const handleDelete = async () => {
    if (!selectedHabit) return;
    try {
      const apiBase = getApiBase();
      await axios.delete(`${apiBase}/habits/${selectedHabit._id}`);
      console.log("Habit deleted");
      fetchhabits(); // Refresh list
      setModalVisible(false);
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  const handleArchive = async () => {
    if (!selectedHabit) return;
    try {
      const apiBase = getApiBase();
      await axios.patch(`${apiBase}/habits/${selectedHabit._id}`, {
        archived: true,
      });
      console.log("Habit archived");
      fetchhabits(); // Refresh list
      setModalVisible(false);
    } catch (error) {
      console.error("Error archiving habit:", error);
    }
  };

  const handleSkip = () => {
    console.log("Habit skipped");
    setModalVisible(false);
  };

  const openHabitMenu = (habit) => {
    setSelectedHabit(habit);
    setModalVisible(true);
  };
  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: PALETTE.background, padding: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Ionicons name="logo-foursquare" size={27} color={PALETTE.textPrimary} />
          <AntDesign
            onPress={() => router.push("/home/create")}
            name="plus"
            size={24}
            color={PALETTE.textPrimary}
          />
        </View>
        <Text style={{ marginTop: 5, fontSize: 23, fontWeight: "500", color: PALETTE.textPrimary }}>
          Habbits
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            marginVertical: 15,
            paddingHorizontal: 5,
          }}
        >
          <Pressable
            onPress={() => setOption("Today")}
            style={{
              backgroundColor: option === "Today" ? PALETTE.primary : PALETTE.subtleBg,
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 25,
              marginTop: 0,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: option === "Today" ? 0 : 1,
              borderColor: PALETTE.muted,
              shadowColor: option === "Today" ? PALETTE.primary : "transparent",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: option === "Today" ? 0.3 : 0,
              shadowRadius: 3,
              elevation: option === "Today" ? 5 : 0,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: option === "Today" ? "white" : PALETTE.textSecondary,
                fontSize: 14,
                fontWeight: option === "Today" ? "600" : "500",
              }}
            >
              📅 Today
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setOption("Weekly")}
            style={{
              backgroundColor: option === "Weekly" ? PALETTE.success : PALETTE.subtleBg,
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 25,
              marginTop: 0,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: option === "Weekly" ? 0 : 1,
              borderColor: PALETTE.muted,
              shadowColor: option === "Weekly" ? PALETTE.success : "transparent",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: option === "Weekly" ? 0.3 : 0,
              shadowRadius: 3,
              elevation: option === "Weekly" ? 5 : 0,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: option === "Weekly" ? "white" : PALETTE.textSecondary,
                fontSize: 14,
                fontWeight: option === "Weekly" ? "600" : "500",
              }}
            >
              📆 Weekly
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setOption("Monthly")}
            style={{
              backgroundColor: option === "Monthly" ? PALETTE.accent : PALETTE.subtleBg,
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 25,
              marginTop: 0,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: option === "Monthly" ? 0 : 1,
              borderColor: PALETTE.muted,
              shadowColor: option === "Monthly" ? PALETTE.accent : "transparent",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: option === "Monthly" ? 0.3 : 0,
              shadowRadius: 3,
              elevation: option === "Monthly" ? 5 : 0,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: option === "Monthly" ? "white" : PALETTE.textSecondary,
                fontSize: 14,
                fontWeight: option === "Monthly" ? "600" : "500",
              }}
            >
              📊 Monthly
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setOption("Overall")}
            style={{
              backgroundColor: option === "Overall" ? PALETTE.secondary : PALETTE.subtleBg,
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 25,
              marginTop: 0,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: option === "Overall" ? 0 : 1,
              borderColor: PALETTE.muted,
              shadowColor: option === "Overall" ? PALETTE.secondary : "transparent",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: option === "Overall" ? 0.3 : 0,
              shadowRadius: 3,
              elevation: option === "Overall" ? 5 : 0,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: option === "Overall" ? "white" : PALETTE.textSecondary,
                fontSize: 14,
                fontWeight: option === "Overall" ? "600" : "500",
              }}
            >
              ⭐ Overall
            </Text>
          </Pressable>
        </View>
        {/* Filter habits based on selected option */}
        {(() => {
          let filteredHabits = habits;
          
          if (option === "Today") {
            filteredHabits = habits.filter(h => h.repeatMode === "Daily");
          } else if (option === "Weekly") {
            filteredHabits = habits.filter(h => h.repeatMode === "Weekly");
          } else if (option === "Monthly") {
            filteredHabits = habits.filter(h => h.repeatMode === "Monthly");
          } else if (option === "Overall") {
            filteredHabits = habits;
          }

          return filteredHabits.length > 0 ? (
            <View style={{ marginTop: 15 }}>
              {filteredHabits?.map((habit, index) => (
                <Pressable
                  key={index}
                  onPress={() => openHabitMenu(habit)}
                  style={{
                    marginVertical: 10,
                    padding: 18,
                    borderRadius: 15,
                    backgroundColor: habit.color || PALETTE.cardDefault,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.15,
                    shadowRadius: 5,
                    elevation: 6,
                    borderWidth: 1,
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: "white",
                          fontWeight: "700",
                          marginBottom: 6,
                        }}
                      >
                        {habit?.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: "rgba(255, 255, 255, 0.9)",
                          fontWeight: "500",
                        }}
                      >
                        {habit?.repeatMode} • {habit?.reminder ? `🔔 ${habit?.reminderTime || "09:00"}` : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.18)",
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 12,
                      }}
                    >
                      <Text style={{ color: "white", fontWeight: "600" }}>
                        ➤
                      </Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          ) : (
            <View
              style={{
                marginTop: 50,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "auto",
                paddingVertical: 40,
              }}
            >
              <Text
                style={{
                  fontSize: 48,
                  marginBottom: 20,
                }}
              >
                📭
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "700",
                  marginTop: 10,
                  color: PALETTE.textPrimary,
                }}
              >
                No habits for {option.toLowerCase()}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: "500",
                  marginTop: 10,
                  color: PALETTE.muted,
                  paddingHorizontal: 20,
                }}
              >
                Start building better habits today!
              </Text>
              <Pressable
                onPress={() => router.push("/home/create")}
                style={{
                  backgroundColor: PALETTE.primary,
                  paddingVertical: 14,
                  paddingHorizontal: 40,
                  borderRadius: 12,
                  marginTop: 25,
                  shadowColor: PALETTE.primary,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 5,
                  elevation: 6,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "700",
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  + Create Habit
                </Text>
              </Pressable>
            </View>
          );
        })()}
      </ScrollView>

      {/* Modal for habit actions */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
              paddingBottom: 30,
            }}
          >
            {/* Close button */}
            <Pressable
              onPress={() => setModalVisible(false)}
              style={{ alignSelf: "flex-end", marginBottom: 10 }}
            >
              <AntDesign name="close" size={24} color="black" />
            </Pressable>

            {/* Habit name */}
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              {selectedHabit?.name}
            </Text>

            {/* Action buttons */}
            <View style={{ gap: 12 }}>
              {/* Complete */}
              <Pressable
                onPress={handleComplete}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 15,
                  paddingHorizontal: 15,
                  backgroundColor: "#27AE60",
                  borderRadius: 10,
                  gap: 12,
                }}
              >
                <MaterialIcons name="check-circle" size={24} color="white" />
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "500",
                    flex: 1,
                  }}
                >
                  Complete
                </Text>
              </Pressable>

              {/* Skip */}
              <Pressable
                onPress={handleSkip}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 15,
                  paddingHorizontal: 15,
                  backgroundColor: "#F39C12",
                  borderRadius: 10,
                  gap: 12,
                }}
              >
                <MaterialIcons name="skip-next" size={24} color="white" />
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "500",
                    flex: 1,
                  }}
                >
                  Skip
                </Text>
              </Pressable>

              {/* Edit */}
              <Pressable
                onPress={handleEdit}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 15,
                  paddingHorizontal: 15,
                  backgroundColor: "#3498DB",
                  borderRadius: 10,
                  gap: 12,
                }}
              >
                <MaterialIcons name="edit" size={24} color="white" />
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "500",
                    flex: 1,
                  }}
                >
                  Edit
                </Text>
              </Pressable>

              {/* Delete */}
              <Pressable
                onPress={handleDelete}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 15,
                  paddingHorizontal: 15,
                  backgroundColor: "#E74C3C",
                  borderRadius: 10,
                  gap: 12,
                }}
              >
                <MaterialIcons name="delete" size={24} color="white" />
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "500",
                    flex: 1,
                  }}
                >
                  Delete
                </Text>
              </Pressable>

              {/* Archive */}
              <Pressable
                onPress={handleArchive}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 15,
                  paddingHorizontal: 15,
                  backgroundColor: "#95A5A6",
                  borderRadius: 10,
                  gap: 12,
                }}
              >
                <MaterialIcons name="archive" size={24} color="white" />
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "500",
                    flex: 1,
                  }}
                >
                  Archive
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Index;
const styles = StyleSheet.create({});

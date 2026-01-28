import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const Create = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [title, setTitle] = useState("");
  const [habitMode, setHabitMode] = useState("Daily"); // Daily, Weekly, or Monthly
  const [selectedDays, setSelectedDays] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });
  const [selectedDatesOfMonth, setSelectedDatesOfMonth] = useState({});
  const [reminder, setReminder] = useState(true);
  const [reminderTime, setReminderTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedMonths, setSelectedMonths] = useState({}); // For month selection
  const router = useRouter();

  // Initialize month dates and months
  React.useEffect(() => {
    const monthDates = {};
    for (let i = 1; i <= 31; i++) {
      monthDates[i] = false;
    }
    setSelectedDatesOfMonth(monthDates);

    // Initialize selected months
    const months = {};
    for (let i = 0; i < 12; i++) {
      months[i] = false;
    }
    setSelectedMonths(months);
  }, []);

  // Get calendar data for current month
  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // First day of month and number of days in month
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarDays = [];

    // Add empty spaces for days before month starts
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null);
    }

    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(i);
    }

    return calendarDays;
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const colors = [
    "#E74C3C",
    "#8E44AD",
    "#3498DB",
    "#1ABC9C",
    "#27AE60",
    "#F1C40F",
    "#E67E22",
    "#2C3E50",
  ];
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const dayLabels = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const toggleDay = (day) => {
    setSelectedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const toggleMonthDate = (date) => {
    setSelectedDatesOfMonth((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  const toggleMonth = (monthIndex) => {
    setSelectedMonths((prev) => ({
      ...prev,
      [monthIndex]: !prev[monthIndex],
    }));
  };

  const addHabit = async () => {
    console.log("=== addHabit Started ===");
    console.log("Title:", title);
    console.log("Color:", selectedColor);
    console.log("Mode:", habitMode);

    if (!title.trim()) {
      console.log("Title is empty");
      Alert.alert("Validation Error", "Please enter a habit title");
      return;
    }
    if (!selectedColor) {
      console.log("Color not selected");
      Alert.alert("Validation Error", "Please select a color");
      return;
    }

    // For Weekly mode, validate day selection
    if (habitMode === "Weekly") {
      const selectedDaysList = Object.keys(selectedDays).filter(
        (day) => selectedDays[day]
      );
      if (selectedDaysList.length === 0) {
        Alert.alert("Validation Error", "Please select at least one day");
        return;
      }
    }

    // For Monthly mode, validate date selection
    if (habitMode === "Monthly") {
      const selectedDatesList = Object.keys(selectedDatesOfMonth).filter(
        (key) => selectedDatesOfMonth[key]
      );
      const selectedMonthsList = Object.keys(selectedMonths).filter(
        (key) => selectedMonths[key]
      );
      if (selectedDatesList.length === 0 && selectedMonthsList.length === 0) {
        Alert.alert(
          "Validation Error",
          "Please select at least one date or month"
        );
        return;
      }
    }

    try {
      const habitDetails = {
        name: title,
        color: selectedColor,
        repeatMode: habitMode,
        reminder: reminder,
        reminderTime: `${reminderTime.getHours().toString().padStart(2, '0')}:${reminderTime.getMinutes().toString().padStart(2, '0')}`,
      };

      // Add daysOfWeek if in Weekly mode
      if (habitMode === "Weekly") {
        habitDetails.daysOfWeek = Object.keys(selectedDays).filter(
          (day) => selectedDays[day]
        );
      }

      // Add daysOfMonth if in Monthly mode
      if (habitMode === "Monthly") {
        // Format: store selected dates with month/year info
        habitDetails.daysOfMonth = Object.keys(selectedDatesOfMonth)
          .filter((key) => selectedDatesOfMonth[key])
          .map((key) => {
            const parts = key.split("-");
            if (parts.length === 3) {
              return {
                year: parseInt(parts[0]),
                month: parseInt(parts[1]),
                date: parseInt(parts[2]),
                label: `${monthNames[parseInt(parts[1])]} ${parts[2]}, ${
                  parts[0]
                }`,
              };
            }
            return key;
          });

        // Add selected months if any
        const selectedMonthsList = Object.keys(selectedMonths)
          .filter((key) => selectedMonths[key])
          .map((monthIndex) => ({
            month: parseInt(monthIndex),
            monthName: monthNames[parseInt(monthIndex)],
          }));

        if (selectedMonthsList.length > 0) {
          habitDetails.selectedMonths = selectedMonthsList;
        }
      }

      console.log("📤 Sending to server:", habitDetails);

      const getDeviceHost = () => {
        try {
          const manifest = Constants.manifest || Constants.manifest2 || {};
          const debuggerHost =
            manifest.debuggerHost ||
            (manifest.packagerOpts && manifest.packagerOpts.dev
              ? manifest.debuggerHost
              : undefined);
          if (debuggerHost) return debuggerHost.split(":")[0];
        } catch (e) {
          // ignore
        }
        return "192.168.31.242";
      };

      const API_BASE = (function () {
        // For web deployment, use environment variable
        if (Platform.OS === "web") {
          return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
        }
        if (Platform.OS === "android") return "http://10.0.2.2:3000";
        const host = getDeviceHost();
        return `http://${host}:3000`;
      })();

      const response = await axios.post(`${API_BASE}/habits`, habitDetails, {
        timeout: 10000,
      });

      console.log("Response Status:", response.status);
      console.log("Response Data:", response.data);

      if (response.status === 200 || response.status === 201) {
        setTitle("");
        setSelectedColor("");
        setHabitMode("Daily");
        setSelectedDays({
          Monday: false,
          Tuesday: false,
          Wednesday: false,
          Thursday: false,
          Friday: false,
          Saturday: false,
          Sunday: false,
        });
        const monthDates = {};
        for (let i = 1; i <= 31; i++) {
          monthDates[i] = false;
        }
        setSelectedDatesOfMonth(monthDates);
        setReminder(true);
        Alert.alert(
          "Success!",
          `${habitMode} habit "${title}" added successfully. Enjoy Practicing!`,
          [
            {
              text: "OK",
              onPress: () => router.push("/home"),
            },
          ]
        );
        console.log("Alert shown successfully");
      }
    } catch (error) {
      console.log("ERROR CAUGHT");
      console.log("Error Message:", error.message);
      console.log("Error Code:", error.code);

      if (error.response) {
        console.log("Server responded with error:", error.response.status);
        console.log("Error details:", error.response.data);
        Alert.alert(
          "Server Error",
          error.response.data.message || "Failed to save habit"
        );
      } else if (error.request) {
        console.log("No response from server");
        Alert.alert(
          "Connection Error",
          "Server not responding. Make sure:\n1. API is running\n2. IP is correct (192.168.31.242:3000)"
        );
      } else {
        console.log("Request setup error:", error.message);
        Alert.alert("Error", "Failed to send request: " + error.message);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text style={styles.headerText}>
          Create <Text style={{ fontWeight: "700" }}>Habit</Text>
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Mode Toggle: Daily / Weekly / Monthly */}
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
        <Pressable
          onPress={() => setHabitMode("Daily")}
          style={{
            flex: 1,
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius: 8,
            backgroundColor: habitMode === "Daily" ? "#3498DB" : "#f0f0f0",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: habitMode === "Daily" ? "white" : "black",
            }}
          >
            Daily
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setHabitMode("Weekly")}
          style={{
            flex: 1,
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius: 8,
            backgroundColor: habitMode === "Weekly" ? "#3498DB" : "#f0f0f0",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: habitMode === "Weekly" ? "white" : "black",
            }}
          >
            Weekly
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setHabitMode("Monthly")}
          style={{
            flex: 1,
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius: 8,
            backgroundColor: habitMode === "Monthly" ? "#3498DB" : "#f0f0f0",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: habitMode === "Monthly" ? "white" : "black",
            }}
          >
            Monthly
          </Text>
        </Pressable>
      </View>

      <TextInput
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="#999"
      />

      <View style={{ marginVertical: 20 }}>
        <Text style={{ fontWeight: "500", fontSize: 18, marginBottom: 10 }}>
          Color
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          {colors.map((item, index) => (
            <TouchableOpacity
              onPress={() => setSelectedColor(item)}
              key={index}
              activeOpacity={0.8}
            >
              {selectedColor === item ? (
                <AntDesign name="plus-square" size={24} color="black" />
              ) : (
                <FontAwesome name="square" size={30} color={item} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <Text style={{ fontSize: 18, fontWeight: "500", marginTop: 20 }}>
          Repeat
        </Text>
        <View style={styles.row}>
          <Pressable style={styles.repeatButton}>
            <Text style={styles.centerText}>Daily</Text>
          </Pressable>
          <Pressable style={styles.repeatButton}>
            <Text style={styles.centerText}>Weekly</Text>
          </Pressable>
          <Pressable style={styles.repeatButton}>
            <Text style={styles.centerText}>Monthly</Text>
          </Pressable>
        </View>

        {/* Show day selection only for Weekly mode */}
        {habitMode === "Weekly" && (
          <>
            <Text style={{ fontSize: 18, fontWeight: "500", marginTop: 20 }}>
              Select Days
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                marginBottom: 15,
              }}
            >
              {dayLabels.map((day) => (
                <Pressable
                  key={day}
                  onPress={() => toggleDay(day)}
                  style={{
                    width: "23%",
                    paddingVertical: 12,
                    borderRadius: 8,
                    backgroundColor: selectedDays[day]
                      ? selectedColor || "#3498DB"
                      : "#f0f0f0",
                    borderWidth: 2,
                    borderColor: selectedDays[day]
                      ? selectedColor || "#3498DB"
                      : "#ddd",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                      color: selectedDays[day] ? "white" : "black",
                    }}
                  >
                    {day.substring(0, 3)}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}

        {/* Show date selection only for Monthly mode */}
        {habitMode === "Monthly" && (
          <>
            {/* Month Selection Option */}
            <View style={{ marginTop: 15 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  marginBottom: 10,
                }}
              >
                Select Months (Optional)
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 8,
                  marginBottom: 15,
                }}
              >
                {monthNames.map((month, index) => (
                  <Pressable
                    key={index}
                    onPress={() => toggleMonth(index)}
                    style={{
                      paddingVertical: 6,
                      paddingHorizontal: 10,
                      borderRadius: 6,
                      backgroundColor: selectedMonths[index]
                        ? selectedColor || "#3498DB"
                        : "#f0f0f0",
                      borderWidth: 1,
                      borderColor: selectedMonths[index]
                        ? selectedColor || "#3498DB"
                        : "#ddd",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: "600",
                        color: selectedMonths[index] ? "white" : "black",
                      }}
                    >
                      {month.substring(0, 3)}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              Or Select Dates
            </Text>

            {/* Calendar Header with Month/Year and Navigation */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 8,
                paddingHorizontal: 5,
              }}
            >
              <Pressable
                onPress={goToPreviousMonth}
                style={{
                  padding: 4,
                  borderRadius: 4,
                  backgroundColor: "#f0f0f0",
                }}
              >
                <AntDesign name="left" size={14} color="black" />
              </Pressable>

              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "bold",
                  textAlign: "center",
                  flex: 1,
                }}
              >
                {monthNames[currentMonth.getMonth()]}{" "}
                {currentMonth.getFullYear()}
              </Text>

              <Pressable
                onPress={goToNextMonth}
                style={{
                  padding: 4,
                  borderRadius: 4,
                  backgroundColor: "#f0f0f0",
                }}
              >
                <AntDesign name="right" size={14} color="black" />
              </Pressable>
            </View>

            {/* Day Headers (Sun, Mon, Tue, etc.) */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <Text
                  key={day}
                  style={{
                    width: "13%",
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#666",
                    fontSize: 8,
                  }}
                >
                  {day}
                </Text>
              ))}
            </View>

            {/* Calendar Grid */}
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 0.5,
                marginBottom: 10,
                justifyContent: "space-between",
              }}
            >
              {getCalendarDays().map((date, index) => (
                <Pressable
                  key={index}
                  onPress={() => {
                    if (date) {
                      // Create unique key for this month/date combination
                      const dateKey = `${currentMonth.getFullYear()}-${currentMonth.getMonth()}-${date}`;
                      setSelectedDatesOfMonth((prev) => ({
                        ...prev,
                        [dateKey]: !prev[dateKey],
                      }));
                    }
                  }}
                  disabled={!date}
                  style={{
                    width: "13%",
                    aspectRatio: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 4,
                    backgroundColor:
                      date &&
                      selectedDatesOfMonth[
                        `${currentMonth.getFullYear()}-${currentMonth.getMonth()}-${date}`
                      ]
                        ? selectedColor || "#3498DB"
                        : date
                        ? "#f0f0f0"
                        : "transparent",
                    borderWidth:
                      date &&
                      selectedDatesOfMonth[
                        `${currentMonth.getFullYear()}-${currentMonth.getMonth()}-${date}`
                      ]
                        ? 2
                        : 1,
                    borderColor:
                      date &&
                      selectedDatesOfMonth[
                        `${currentMonth.getFullYear()}-${currentMonth.getMonth()}-${date}`
                      ]
                        ? selectedColor || "#3498DB"
                        : date
                        ? "#ddd"
                        : "transparent",
                  }}
                >
                  {date && (
                    <Text
                      style={{
                        fontSize: 8,
                        fontWeight: "bold",
                        color: selectedDatesOfMonth[
                          `${currentMonth.getFullYear()}-${currentMonth.getMonth()}-${date}`
                        ]
                          ? "white"
                          : "black",
                      }}
                    >
                      {date}
                    </Text>
                  )}
                </Pressable>
              ))}
            </View>

            {/* Selected Months Summary */}
            {Object.keys(selectedMonths).some((k) => selectedMonths[k]) && (
              <View
                style={{
                  padding: 10,
                  backgroundColor: "#f0f8ff",
                  borderRadius: 8,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{ fontSize: 11, fontWeight: "600", color: "#333" }}
                >
                  Selected Months:{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    {Object.keys(selectedMonths)
                      .filter((k) => selectedMonths[k])
                      .map((k) => monthNames[parseInt(k)].substring(0, 3))
                      .join(", ")}
                  </Text>
                </Text>
              </View>
            )}

            {/* Selected Dates Summary */}
            {Object.keys(selectedDatesOfMonth).some(
              (k) => selectedDatesOfMonth[k]
            ) && (
              <View
                style={{
                  padding: 12,
                  backgroundColor: "#e8f4f8",
                  borderRadius: 8,
                  marginBottom: 15,
                }}
              >
                <Text
                  style={{ fontSize: 12, fontWeight: "500", color: "#333" }}
                >
                  Selected Dates:{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    {Object.keys(selectedDatesOfMonth)
                      .filter((k) => selectedDatesOfMonth[k])
                      .map((k) => {
                        const parts = k.split("-");
                        if (parts.length === 3) {
                          const year = parts[0];
                          const month = parseInt(parts[1]);
                          const date = parts[2];
                          return `${monthNames[month]} ${date}, ${year}`;
                        }
                        return k;
                      })
                      .join(", ")}
                  </Text>
                </Text>
              </View>
            )}
          </>
        )}

        <View style={styles.reminderRow}>
          <Text style={{ fontSize: 17, fontWeight: "500" }}>Reminder</Text>
          <Pressable
            onPress={() => setReminder(!reminder)}
            style={{
              width: 50,
              height: 28,
              borderRadius: 14,
              backgroundColor: reminder ? "#27AE60" : "#ddd",
              justifyContent: "center",
              paddingHorizontal: 2,
            }}
          >
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: "white",
                alignSelf: reminder ? "flex-end" : "flex-start",
              }}
            />
          </Pressable>
        </View>

        {reminder && (
          <View style={styles.timePickerContainer}>
            <Text style={{ fontSize: 15, fontWeight: "500", marginBottom: 10 }}>
              Reminder Time
            </Text>
            <Pressable
              onPress={() => setShowTimePicker(true)}
              style={styles.timePickerButton}
            >
              <MaterialIcons name="access-time" size={24} color="#2D8CFF" />
              <Text style={styles.timePickerText}>
                {reminderTime.getHours().toString().padStart(2, '0')}:
                {reminderTime.getMinutes().toString().padStart(2, '0')}
              </Text>
            </Pressable>
            {showTimePicker && (
              <DateTimePicker
                value={reminderTime}
                mode="time"
                is24Hour={true}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, selectedDate) => {
                  setShowTimePicker(Platform.OS === "ios");
                  if (selectedDate) {
                    setReminderTime(selectedDate);
                  }
                }}
              />
            )}
          </View>
        )}

        <TouchableOpacity onPress={addHabit} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>
            {habitMode === "Weekly"
              ? "CREATE WEEKLY HABIT"
              : habitMode === "Monthly"
              ? "CREATE MONTHLY HABIT"
              : "SAVE"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  headerText: { fontSize: 24, marginTop: 10 },
  input: {
    width: "100%",
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#E1EBEE",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
  repeatButton: {
    backgroundColor: "#AFDBF5",
    padding: 10,
    borderRadius: 6,
    flex: 1,
  },
  centerText: { textAlign: "center" },
  dayBox: {
    width: 30,
    height: 30,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  reminderRow: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timePickerContainer: {
    marginTop: 15,
    padding: 15,
    backgroundColor: "#F7FBFF",
    borderRadius: 10,
  },
  timePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2D8CFF",
    gap: 10,
  },
  timePickerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2D8CFF",
  },
  saveButton: {
    marginTop: 27,
    backgroundColor: "#3498DB",
    padding: 15,
    borderRadius: 8,
  },
  saveButtonText: { textAlign: "center", color: "white", fontWeight: "bold" },
});

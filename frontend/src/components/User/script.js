let streak = [7,8,9,10,12,13,14];
const today = new Date().getDate();
let currentStreak = 0;
let currentStreakRange = "";
for (let i = streak.length - 1; i >= 0; i--) {
  if (streak[i] === today - currentStreak) {
    currentStreak++;
  }
}

// Calculate current streak range
if (currentStreak > 0) {
  const startDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    streak[streak.length - currentStreak]
  );
  const endDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    streak[streak.length - 1]
  );
  currentStreakRange = `${startDate.toLocaleString("default", {
    month: "long",
  })} ${streak[streak.length - currentStreak]} - ${endDate.toLocaleString(
    "default",
    {
      month: "long",
    }
  )} ${streak[streak.length - 1]}`;
} else {
  currentStreakRange = "";
}
// Calculate longest streak range
let longestStreak = 0;
let longestStreakRange = "";
let maxStart = 0;
let maxEnd = 0;

for (let i = 0; i < streak.length; i++) {
  let currentStreak = 1;
  let j = i + 1;
  while (j < streak.length && streak[j] === streak[j - 1] + 1) {
    currentStreak++;
    j++;
  }

  if (currentStreak > longestStreak) {
    longestStreak = currentStreak;
    maxStart = i;
    maxEnd = j - 1;
  }

  i = j - 1;
}

if (longestStreak > 0) {
  const startDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    streak[maxStart]
  );
  const endDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    streak[maxEnd]
  );
  longestStreakRange = `${startDate.toLocaleString("default", {
    month: "long",
  })} ${streak[maxStart]} - ${endDate.toLocaleString("default", {
    month: "long",
  })} ${streak[maxEnd]}`;
} else {
  longestStreakRange = "";
}

console.log(
  currentStreak,
  currentStreakRange,
  longestStreak,
  longestStreakRange
);

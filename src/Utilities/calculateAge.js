function calculateAge(dob) {
  // Parse the date of birth
  const birthDate = new Date(dob);
  const today = new Date();

  // Calculate the year difference
  let age = today.getFullYear() - birthDate.getFullYear();

  // Adjust if the birthday hasn't occurred yet this year
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

export default calculateAge;

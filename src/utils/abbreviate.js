const abbreviate = (number) =>{
  const i = parseInt(number);
  const digits = `${i}`

  if (i < 0 || i >= 1_000_000_000_000) {
    return digits;
  }
  else if (i < 10_000) {
    return digits;
  }
  else if (i < 1_000_000) {
    return `${digits.slice(0, -3)}K`
  }
  else if (i < 100_000_000) {
    if (digits.charAt(-6) === "0") {
      return `${digits.slice(0, -6)}M`
    } else {
      return `${digits.slice(0, -6)}.${digits.charAt(-6)}M`
    }
  }
  else if (i < 1_000_000_000) {
    return `${digits.slice(0, -6)}M`
  }
  else if (i < 100_000_000_000) {
    if (digits.charAt(-9) === "0") {
      return `${digits.slice(0, -9)}B`
    } else {
      return `${digits.slice(0, -9)}.${digits.charAt(-9)}B`
    }
  }
  else if (i < 1_000_000_000_000) {
    return `${digits.slice(0, -9)}B`
  }
}

export default abbreviate;

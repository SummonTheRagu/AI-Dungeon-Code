
const modifier = ({ text }) => {
    if (state.useCustomResponse) {
      const response = state.customResponse
      state.customResponse = ""
        state.useCustomResponse = false; // Reset the flag
        return { text: response };// Use the custom response
    }
    return { text }; // Proceed with the AI's original response
};

// Don't modify this part
modifier(text)

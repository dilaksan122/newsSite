import axios from 'axios';

const API_KEY = 'AIzaSyBo2xoHEuC1jbQgIwHaMBacGzYDsCTIbH0';  // Replace with your actual API key

export const translateText = async (text, targetLanguage) => {
  const url = `https://translation.googleapis.com/language/translate/v2`;

  // Regular expression to match special characters and spaces (preserving them during translation)
  const specialCharsRegex = /[.,:;!?'"(){}[\]]/g;

  // Split the text into words, while preserving spaces and special characters
  const words = text.split(/(\s+|[.,:;!?'"(){}[\]])/);

  // Translate only the words that are not special characters or whitespace
  const translatedWords = await Promise.all(
    words.map(async (word) => {
      if (specialCharsRegex.test(word) || word.trim() === '') {
        // Return special characters or whitespace as is
        return word;
      } else {
        try {
          // Use Google Translate API to translate the word
          const response = await axios.post(url, {}, {
            params: {
              q: word,
              target: targetLanguage,
              key: API_KEY
            }
          });

          // Return the translated word
          return response.data.data.translations[0].translatedText;
        } catch (error) {
          console.error('Error translating word:', error);
          return word; // Return the original word if translation fails
        }
      }
    })
  );

  // Join the words back together
  return translatedWords.join('');
};

const API_KEY = 'AIzaSyC42osipL0YDBsRJaico7Wn-PTOS57F7tI';

export async function getGeminiResponse(prompt: string) {
  const response = await fetch(
    'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=' + API_KEY,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      }),
    }
  );
  const data = await response.json();
  return data;
}
// Client-side utility to interact with Google Sheets via Google Apps Script Proxy
// This allows the site to remain static (GitHub Pages) while having dynamic guestbook features.

const SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL || '';

export async function getWishes() {
  if (!SCRIPT_URL) return [];
  try {
    const response = await fetch(SCRIPT_URL);
    if (!response.ok) throw new Error('Failed to fetch wishes');
    return await response.json();
  } catch (error) {
    console.error('Error fetching wishes:', error);
    return [];
  }
}

export async function addWish(wish: { name: string; attendance: string; message: string; id: string; createdAt: string }) {
  if (!SCRIPT_URL) {
    console.error('GOOGLE_APPS_SCRIPT_URL is not defined');
    return null;
  }
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Apps Script requires no-cors for simple POST or handles CORS specifically
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wish),
    });
    // Note: with no-cors, we can't read the response body, but the data will be sent.
    return wish;
  } catch (error) {
    console.error('Error adding wish:', error);
    throw error;
  }
}

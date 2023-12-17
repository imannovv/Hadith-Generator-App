"use strict";

const diceBtn = document.querySelector(".button-section");
const hadithInformation = document.querySelector(".hadith-information");
const hadithText = document.querySelector(".hadiths");

const apiUrl = 'https://www.hadithapi.com/public/api/hadiths?apiKey=$2y$10$9y7zW19VkxRgpPNM6lBRvushe1kzzXwS38RgpNis7clgnoZgrPv&page=';

let allHadithData = []; // To store fetched data

// Function to fetch data from API
const fetchData = async (page) => {
  try {
    const response = await fetch(apiUrl + page);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    allHadithData = allHadithData.concat(data.hadiths.data);

    if (data.hadiths.next_page_url) {
      const nextPage = page + 1;
      await fetchData(nextPage); // Fetch next page if available
    } else {
      console.log('All data fetched:', allHadithData);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Initial fetch on page load
fetchData(1); // Start fetching from page 1

// Button click event to display fetched data
diceBtn.addEventListener("click", () => {
  if (allHadithData.length > 0) {
    const randomIndex = Math.floor(Math.random() * allHadithData.length);
    const randomHadith = allHadithData[randomIndex];
    
    hadithInformation.innerHTML = `Book: ${randomHadith.book.bookName}, Hadith Number: ${randomHadith.hadithNumber}, Status: ${randomHadith.status}`;
    hadithText.innerHTML = randomHadith.hadithEnglish; // Displaying the English version of the hadith
  } else {
    hadithInformation.innerHTML = 'Data not available. Try again later.';
    hadithText.innerHTML = '';
  }
});



const input = document.querySelector("input");
const btn = document.querySelector("button");
const dictionary = document.querySelector(".dictionary-App");

// API endpoint
const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

async function dictionaryFn(word) {
    try {
        const res = await fetch(`${API_URL}${word}`);
        if (!res.ok) throw new Error("Word not found");
        const data = await res.json();
        return data[0];
    } catch (error) {
        console.error(error);
        return null;
    }
}

btn.addEventListener('click', fetchAndCreateCard);

async function fetchAndCreateCard() {
    const word = input.value.trim();
    if (!word) {
        alert("Please enter a word");
        return;
    }

    const data = await dictionaryFn(word);
    if (!data) {
        dictionary.innerHTML = `<div class="card"><span>Word not found</span></div>`;
        return;
    }

    console.log(data);

    let partOfSpeechArray = data.meanings.map(meaning => meaning.partOfSpeech);

    dictionary.innerHTML = `
    <div class="card">
        <div class="property">
            <span>Word:</span>
            <span>${data.word}</span>
        </div>
        <div class="property">
            <span>Phonetics:</span>
            <span>${data.phonetic || 'N/A'}</span>
        </div>
        <div class="property">
            <span>Audio:</span>
            <span>
                <audio controls src="${data.phonetics[0]?.audio || ''}"></audio>
            </span>
        </div>
        <div class="property">
            <span>Definition:</span>
            <span>${data.meanings[0].definitions[0].definition}</span>
        </div>
        <div class="property">
            <span>Examples:</span>
            <span>${data.meanings[0].definitions[0].example || 'N/A'}</span>
            
        </div>
        <div class="property">
            <span>Part Of Speech:</span>
            <span>${partOfSpeechArray.join(', ')}</span>
        </div>
    </div>
    `;
}


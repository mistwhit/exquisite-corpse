// form handler for form on /write page. grabs text input and passes into database at /api/fragments endpoint, creating a Fragment instance.

const submitFragment = async (event) => {
  console.log('Somebody clicked the submit poem button');

  event.preventDefault();

  const text_input = document.querySelector('#fragment').value.trim();

  if (text_input) {
    const response = await fetch('/api/fragments', {
      method: 'POST',
      body: JSON.stringify({ text_input }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/poem');
    } else {
      alert('Failed to write poem fragment. Try again.');
    }
  }
};

document
  .querySelector('#write-form')
  .addEventListener('submit', submitFragment);

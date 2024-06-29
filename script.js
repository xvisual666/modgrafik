const items = document.querySelectorAll('.item');
const totalPrice = document.getElementById('total-price');
const expandBtn = document.querySelector('.expand-btn');
const discordId = document.getElementById('discord-id');
const ticketNumber = document.getElementById('ticket');
const discountCode = document.getElementById('discount'); // Tambah variabel untuk kode diskon
const donateBtn = document.getElementById('donate-btn');
const webhookUrl =
  'https://discord.com/api/webhooks/1246808919305883771/f725kupqg8p_WT_EgUGrG-faKdsRoDIGcOeImWCA0OebSf9m5erBfiu8Q2HaxPp2dWKv';

let total = 0;
let selectedItems = [];

const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
});

items.forEach((item) => {
  item.addEventListener('click', () => {
    const price = parseInt(item.getAttribute('data-price'));
    if (item.classList.contains('selected')) {
      total -= price;
      item.classList.remove('selected');
      selectedItems = selectedItems.filter(
        (selectedItem) => selectedItem !== item.textContent.trim()
      );
    } else {
      total += price;
      item.classList.add('selected');
      selectedItems.push(item.textContent.trim());
    }
    calculateTotal(); // Hitung total setiap kali item dipilih
  });
});

ticketNumber.addEventListener('input', () => {
  checkTicketInput();
});

discountCode.addEventListener('input', () => {
  calculateTotal(); // Hitung total setiap kali kode diskon diubah
});

function calculateTotal() {
  let discount = 0;
  const discountCodeValue = discountCode.value.trim().toLowerCase();

  // Daftar kode diskon
  const discountCodes = {
    masdims: 0.1,
    memet: 0.1,
    shiyen: 0.1,
    bill: 0.1,
    hehopanda: 0.1,
    boomzer: 0.1,
    hesoyam: 0.25,
  };

  if (discountCodes.hasOwnProperty(discountCodeValue)) {
    discount = total * discountCodes[discountCodeValue];
  }

  const totalAfterDiscount = total - discount;
  totalPrice.textContent = formatter.format(totalAfterDiscount);
  checkTicketInput();
}

function checkTicketInput() {
  if (ticketNumber.value.trim() !== '') {
    donateBtn.removeAttribute('disabled');
    donateBtn.style.opacity = 1;
    ticketNumber.setCustomValidity('');
  } else {
    donateBtn.setAttribute('disabled', true);
    donateBtn.style.opacity = 0.5;
    ticketNumber.setCustomValidity('Mohon isi nomor tiket');
    ticketNumber.reportValidity();
  }
}

expandBtn.addEventListener('click', () => {
  const hiddenItems = document.querySelectorAll('.item:nth-child(n+5)');
  if (!expandBtn.classList.contains('expanded')) {
    hiddenItems.forEach((item) => {
      item.style.display = 'block';
      item.style.animation = 'fadein 0.5s';
    });
    expandBtn.innerHTML = '&#x25B2; Close';
    expandBtn.classList.add('expanded');
  } else {
    hiddenItems.forEach((item) => {
      item.style.display = 'none';
    });
    expandBtn.innerHTML = '&#x25BC; Expand All Items';
    expandBtn.classList.remove('expanded');
  }
});

document.querySelector('.btn-pay').addEventListener('click', () => {
  if (ticketNumber.value.trim() === '') {
    ticketNumber.reportValidity();
    return;
  }

  const embed = {
    title: 'LAPORAN PESANAN BARU',
    color: 0x007bff,
    fields: [
      {
        name: '# EMAIL',
        value: '```' + discordId.value + '```',
      },
      {
        name: '# NOMOR TIKET',
        value: '```' + ticketNumber.value + '```',
      },
      {
        name: '# PESANAN ITEM',
        value: '```' + selectedItems.join('\n\n') + '```',
      },
      {
        name: '# TOTAL HARGA DONASI',
        value: '```' + totalPrice.textContent + '```', // Gunakan total harga setelah diskon
      },
      {
        name: '# TANGGAL PEMESANAN',
        value:
          '```' +
          new Date().toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }) +
          '```',
      },
    ],
    timestamp: new Date().toISOString(),
  };

  fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ embeds: [embed] }),
  })
    .then((response) => {
      if (response.ok) {
        console.log('Data berhasil dikirim ke Discord');
        window.location.href = 'https://saweria.co/XVISUAL';
      } else {
        console.error('Gagal mengirim data ke Discord');
      }
    })
    .catch((error) => {
      console.error('Terjadi kesalahan:', error);
    });
});

const tourGuide = document.getElementById('tour-guide');
const tourSteps = document.querySelectorAll('.tour-step');
let currentStep = 0;

function showTourGuide() {
  tourGuide.style.display = 'flex';
  showCurrentStep();
}

function showCurrentStep() {
  tourSteps.forEach((step, index) => {
    if (index === currentStep) {
      step.style.display = 'block';
    } else {
      step.style.display = 'none';
    }
  });
}

// Daftar nama-nama orang dan reviewnya
var reviews = [
  { name: 'Dini', review: 'Makasih ka! ⭐️⭐️⭐️⭐️⭐️' },
  { name: 'Dimas', review: 'Cepat banget! ⭐️⭐️⭐️⭐️⭐️' },
  { name: 'Maya', review: 'Keren! ⭐️⭐️⭐️⭐️⭐️' },
  { name: 'Rudi', review: 'Suka banget! ⭐️⭐️⭐️⭐️⭐️' },
  { name: 'Atenk', review: 'Ikan tongkil! ⭐️⭐️⭐️⭐️⭐️' },
  { name: 'Nisa', review: 'Apik tenan! ⭐️⭐️⭐️⭐️⭐️' },
  { name: 'Bayu', review: 'Mantap jiwa! ⭐️⭐️⭐️⭐️⭐️' },
  { name: 'Weng', review: 'Wajib dicoba! ⭐️⭐️⭐️⭐️⭐️' },
  { name: 'Fajar', review: 'P Perang! ⭐️⭐️⭐️⭐️⭐️' },
  { name: 'Adi', review: 'The Best lensa mata! ⭐️⭐️⭐️⭐️⭐️' },
  { name: 'Yoga', review: 'Masih belajar ⭐️⭐️⭐️⭐️⭐️' },
  { name: 'Cindy', review: 'jOSSS ⭐️⭐️⭐️⭐️⭐️' },
  { name: 'Bryan', review: 'piw piw piw ⭐️⭐️⭐️⭐️⭐️' },
  { name: 'Irfan', review: 'Anjay mantap banget ⭐️⭐️⭐️⭐️⭐️' },
  { name: 'Bimo', review: 'Goks ngab! ⭐️⭐️⭐️⭐️⭐️' },
  { name: 'Reza', review: 'Belum dicoba, tapi Amanah ⭐️⭐️⭐️⭐️⭐️' },
  { name: 'Izal', review: 'Ora nyesel! ⭐️⭐️⭐️⭐️⭐️' },
  { name: 'Nisa', review: 'Aman aja~ ⭐️⭐️⭐️⭐️⭐️' },
];

// Fungsi untuk menampilkan review secara acak
function showRandomReview() {
  // Pilih review secara acak dari daftar
  var randomIndex = Math.floor(Math.random() * reviews.length);
  var randomReview = reviews[randomIndex];

  // Buat elemen untuk menampilkan nama dan review
  var reviewElement = document.createElement('div');
  reviewElement.className = 'review';
  reviewElement.textContent = randomReview.name + ': ' + randomReview.review;

  // Tambahkan elemen ke dalam dokumen
  document.body.appendChild(reviewElement);

  // Tambahkan class 'show' dengan sedikit penundaan
  setTimeout(function () {
    reviewElement.classList.add('show');
  }, 100);

  // Hapus elemen review setelah 4 detik
  setTimeout(function () {
    // Hapus class 'show' untuk memberi efek animasi sebelum menghapus elemen
    reviewElement.classList.remove('show');
    // Tunggu sedikit sebelum benar-benar menghapus elemen
    setTimeout(function () {
      reviewElement.remove();
      // Panggil fungsi showRandomReview kembali setelah elemen dihapus
      showRandomReview();
    }, 300); // Menyesuaikan dengan durasi animasi CSS
  }, 4000);
}

// Panggil fungsi showRandomReview saat dokumen selesai dimuat
document.addEventListener('DOMContentLoaded', function (event) {
  showRandomReview();
});

document.addEventListener('DOMContentLoaded', (event) => {
  const floatingBox = document.getElementById('floating-box');
  let isDragging = false;
  let offsetX, offsetY;

  floatingBox.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - floatingBox.getBoundingClientRect().left;
    offsetY = e.clientY - floatingBox.getBoundingClientRect().top;
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      floatingBox.style.left = `${e.clientX - offsetX}px`;
      floatingBox.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
});

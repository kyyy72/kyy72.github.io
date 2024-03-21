function addNote() {
    const title = getNoteTitle();
    const body = getNoteBody();
   
    if (title && body) {
        const newNote = {
            id: `notes-${Math.random().toString(36).substr(2, 9)}`,
            title: title,
            body: body,
            createdAt: new Date().toISOString(),
            archived: false,
        };
   
        notesData.push(newNote);
        renderNotes();
    } else {
        alert("Judul dan isi catatan tidak boleh kosong!");
    }
}

function renderNotes() {
}

function getNoteTitle() {
    const titleInput = document.querySelector("#title");
    return titleInput ? titleInput.value : "";
}

function getNoteBody() {
    const bodyInput = document.getElementById("body");
    return bodyInput ? bodyInput.value : "";
}

class AddNoteForm extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.maxNotes = this.getAttribute('max-notes') || 10; 
  }

  connectedCallback() {
      this.renderForm();
      this.setupFormSubmission();
  }

  renderForm() {
      const form = document.createElement('form');
      form.innerHTML = `
          <label for="title">Judul:</label><br>
          <input type="text" id="title" name="title" required minlength="0" maxlength="100"><br><br>
          <label for="body">Isi:</label><br>
          <textarea id="body" name="body" rows="4" cols="50" required minlength="0" maxlength="500"></textarea><br><br>
          <button type="submit">Tambah Catatan</button>
          <div id="error-message" style="color: red;"></div>
      `;

      const style = document.createElement('style');
      style.textContent = `
          
          #error-message {
              margin-top: 10px;
              font-size: 14px;
          }
          form {
              max-width: 750px;
              margin: 20px auto;
              padding: 30px;
              background-color: #121212;
              border-radius: 10px;
              box-shadow: 0 5px 10px ;
          }
          
          label {
              display: block;
              margin-bottom: 5px;
              font-size: 16px;
              color: #fff;
          }
          
          input[type="text"],
          textarea {
              width: 750px;
              padding: 10px;
              margin-bottom: 25px;
              border: none;
              border-radius: 6px;
              background-color: #fff;
              color: #333;
              font-size: 16px;
          }
          
          textarea {
              resize: vertical;
              min-height: 100px;
          }
          
          button[type="submit"] {
              padding: 10px 20px;
              border: none;
              border-radius: 4px;
              background-color: #f9b234;
              color: #fff;
              font-size: 16px;
              cursor: pointer;
              transition: background-color 0.3s ease;
          }
          
          button[type="submit"]:hover {
              background-color: #e69a0f;
          }
          
          @media screen and (max-width: 768px) {
              form {
                  max-width: 90%;
              }
              
              input[type="text"],
              textarea {
                  width: calc(100% - 20px); 
              }
              
              button[type="submit"] {
                  font-size: 14px;
                  padding: 8px 16px; 
              }
          }
          
          @media screen and (max-width: 480px) {
              input[type="text"],
              textarea {
                  font-size: 14px; 
              }
              
              button[type="submit"] {
                  font-size: 12px; 
                  padding: 6px 12px; 
              }
          }            
          
      `;

      this.shadowRoot.appendChild(style);
      this.shadowRoot.appendChild(form);
  }

  setupFormSubmission() {
      const form = this.shadowRoot.querySelector('form');
      const errorMessage = this.shadowRoot.getElementById('error-message');
      const titleInput = form.querySelector('#title');
      const bodyInput = form.querySelector('#body');
  
      form.addEventListener('submit', event => {
          event.preventDefault();
          if (form.checkValidity()) {
              const formData = new FormData(form);
              const title = formData.get('title');
              const body = formData.get('body');
              const eventToAddNote = new CustomEvent('addNote', { detail: { title, body } });
              document.dispatchEvent(eventToAddNote);
              form.reset(); // Mengosongkan formulir setelah pengiriman
              errorMessage.textContent = ''; // Menghapus pesan error setelah pengiriman
  
              // Menampilkan alert dengan SweetAlert2
              Swal.fire({
                  icon: 'success',
                  title: 'Catatan berhasil ditambahkan!',
                  showConfirmButton: false,
                  timer: 1500 
              });
          } else {
              errorMessage.textContent = 'Harap isi kedua bidang dengan benar.';
          }
      });
  
      titleInput.addEventListener('input', () => {
          if (!titleInput.validity.valid) {
              titleInput.setCustomValidity('Judul harus terdiri dari 0 hingga 10 karakter.');
          } else {
              titleInput.setCustomValidity('');
          }
      });
  
      bodyInput.addEventListener('input', () => {
          if (!bodyInput.validity.valid) {
              bodyInput.setCustomValidity('Isi harus terdiri dari 0 hingga 500 karakter.');
          } else {
              bodyInput.setCustomValidity('');
          }
      });
  }
}    
customElements.define('add-input', AddNoteForm);

document.addEventListener("noteAdded", function(event) {
    const { title, body } = event.detail;
    addNote(title, body);
});
 
  class CustomHeader extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: "open" });
   
      const header = document.createElement("header");
      header.innerHTML = `
        <h1>Notes APP</h1>
      `;
   
      const style = document.createElement("style");
      style.textContent = `
        header {
          background-color: #240A34;
          color: #fff;
          padding: 20px;
          text-align: center;
        }
   
        h1 {
          margin: 0;
        }
        
      `;
   
      shadow.appendChild(style);
      shadow.appendChild(header);
    }
  }
  customElements.define("custom-header", CustomHeader);
     
  class CustomnotesData extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.notesData = [
        {
          id: "notes-jT-jjsyz61J8XKiI",
          title: "Welcome to Notes, Dimas!",
          body: "Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.",
          createdAt: "2022-07-28T10:03:12.594Z",
          archived: false,
        },
        {
          id: "notes-aB-cdefg12345",
          title: "Meeting Agenda",
          body: "Discuss project updates and assign tasks for the upcoming week.",
          createdAt: "2022-08-05T15:30:00.000Z",
          archived: false,
        },
        {
          id: "notes-XyZ-789012345",
          title: "Shopping List",
          body: "Milk, eggs, bread, fruits, and vegetables.",
          createdAt: "2022-08-10T08:45:23.120Z",
          archived: false,
        },
        {
          id: "notes-1a-2b3c4d5e6f",
          title: "Personal Goals",
          body: "Read two books per month, exercise three times a week, learn a new language.",
          createdAt: "2022-08-15T18:12:55.789Z",
          archived: false,
        },
        {
          id: "notes-LMN-456789",
          title: "Recipe: Spaghetti Bolognese",
          body: "Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...",
          createdAt: "2022-08-20T12:30:40.200Z",
          archived: false,
        },
        {
          id: "notes-QwErTyUiOp",
          title: "Workout Routine",
          body: "Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.",
          createdAt: "2022-08-25T09:15:17.890Z",
          archived: false,
        },
        {
          id: "notes-abcdef-987654",
          title: "Book Recommendations",
          body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
          createdAt: "2022-09-01T14:20:05.321Z",
          archived: false,
        },
        {
          id: "notes-zyxwv-54321",
          title: "Daily Reflections",
          body: "Write down three positive things that happened today and one thing to improve tomorrow.",
          createdAt: "2022-09-07T20:40:30.150Z",
          archived: false,
        },
        {
          id: "notes-poiuyt-987654",
          title: "Travel Bucket List",
          body: "1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA",
          createdAt: "2022-09-15T11:55:44.678Z",
          archived: false,
        },
        {
          id: "notes-asdfgh-123456",
          title: "Coding Projects",
          body: "1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project",
          createdAt: "2022-09-20T17:10:12.987Z",
          archived: false,
        },
        {
          id: "notes-5678-abcd-efgh",
          title: "Project Deadline",
          body: "Complete project tasks by the deadline on October 1st.",
          createdAt: "2022-09-28T14:00:00.000Z",
          archived: false,
        },
        {
          id: "notes-9876-wxyz-1234",
          title: "Health Checkup",
          body: "Schedule a routine health checkup with the doctor.",
          createdAt: "2022-10-05T09:30:45.600Z",
          archived: false,
        },
        {
          id: "notes-qwerty-8765-4321",
          title: "Financial Goals",
          body: "1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.",
          createdAt: "2022-10-12T12:15:30.890Z",
          archived: false,
        },
        {
          id: "notes-98765-54321-12345",
          title: "Holiday Plans",
          body: "Research and plan for the upcoming holiday destination.",
          createdAt: "2022-10-20T16:45:00.000Z",
          archived: false,
        },
        {
          id: "notes-1234-abcd-5678",
          title: "Language Learning",
          body: "Practice Spanish vocabulary for 30 minutes every day.",
          createdAt: "2022-10-28T08:00:20.120Z",
          archived: false,
        },
      ];
   
      const style = document.createElement("style");
      style.textContent = `
        .notes-container {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
          padding: 20px;
        }
   
        .note-card {
          background-color: #891652;
          border-radius: 10px;
          padding: 20px;
        }
   
        h2 {
          margin-top: 0;
          margin-bottom: 20px;
        }
   
        p {
          font-size: 16px;
        }
   
        small {
          margin-top: 10px;
        }
      `;
   
      this.shadowRoot.appendChild(style);
    }
   
    connectedCallback() {
      this.render();
      this.addEventListener("noteAdded", this.handleNoteAdded.bind(this));
    }
   
    render() {
      const container = document.createElement("div");
      container.classList.add("notes-container");
   
      this.notesData.forEach((note) => {
        const card = document.createElement("div");
        card.classList.add("note-card");
        card.innerHTML = `
          <h2>${note.title}</h2>
          <p>${note.body}</p>
          <small>${new Date(note.createdAt).toLocaleString()}</small>
        `;
        container.appendChild(card);
      });
   
      this.shadowRoot.appendChild(container);
    }
   
    handleNoteAdded(event) {
      const { title, body } = event.detail;
      const newNote = {
        id: `notes-${Date.now()}`,
        title,
        body,
        createdAt: new Date().toISOString(),
        archived: false,
      };
      this.notesData.push(newNote);
      this.render();
    }
  }
  customElements.define("custom-notes-data", CustomnotesData);

   

  class Custom_Footer extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: "open" });
   
      const footer = document.createElement("footer");
      footer.innerHTML = "<p>&copy; 2024 Rifki Kurniawan</p>";
   
      const style = document.createElement("style");
      style.textContent = `
          footer {
            background-color: #333;
            color: #fff;
            margin-top : 100px;
            padding: 20px;
            text-align: center;
            left: 0;
            bottom: 0;
            width: 100%;
          }
    
          p {
            margin: 0;
          }
        `;
   
      shadow.appendChild(style);
      shadow.appendChild(footer);
    }
  }
  customElements.define("custom-kaki", Custom_Footer);


  class SearchComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.renderSearchBar();
        this.setupSearchListener();
        this.addStyles(); 
    }

    renderSearchBar() {
        const searchBar = document.createElement('div');
        searchBar.innerHTML = `
            <input type="text" id="searchInput" placeholder="Search notes...">
        `;

        this.shadowRoot.appendChild(searchBar);
    }

    setupSearchListener() {
        const searchInput = this.shadowRoot.getElementById('searchInput');

        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const container = document.querySelector('custom-notes-data').shadowRoot.getElementById('container');

            container.innerHTML = ''; 
            notesData.forEach(note => {
                if (note.title.toLowerCase().includes(searchTerm) || note.body.toLowerCase().includes(searchTerm)) {
                    const noteElement = document.createElement('div');
                    noteElement.classList.add('note-content');
                    noteElement.innerHTML = `
                        <h2>${note.title}</h2>
                        <p>${note.body}</p>
                        <p>Created at: ${note.createdAt}</p>
                        <p>Archived: ${note.archived}</p> 
                    `;
                    noteSearch.appendChild(noteElement);
                }
            });
        });
    }


    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Style for the search input */
            #searchInput {
                width: 25%;
                padding: 15px;
                border: 1px solid #ccc;
                border-radius: 5px;
                font-size: 16px;
                box-sizing: border-box;
                margin : 20px;
            }

            #searchInput:focus {
                outline: none;
                border-color: #007bff;
            }
        `;

        this.shadowRoot.appendChild(style);
    }
}

customElements.define('search-component', SearchComponent);
   
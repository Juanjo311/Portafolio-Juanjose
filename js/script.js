let menuVisible = false;
//Función que oculta o muestra el menu
function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList ="";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList ="responsive";
        menuVisible = true;
    }
}

function seleccionar(){
    //oculto el menu una vez que selecciono una opcion
    document.getElementById("nav").classList = "";
    menuVisible = false;
}
//Funcion que aplica las animaciones de las habilidades
function efectoHabilidades(){
    var skills = document.getElementById("skills");
    var distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    if(distancia_skills >= 300){
        let habilidades = document.getElementsByClassName("progreso");
        habilidades[0].classList.add("javascript");
        habilidades[1].classList.add("htmlcss");
        habilidades[2].classList.add("photoshop");
        habilidades[3].classList.add("wordpress");
        habilidades[4].classList.add("drupal");
        habilidades[5].classList.add("comunicacion");
        habilidades[6].classList.add("trabajo");
        habilidades[7].classList.add("creatividad");
        habilidades[8].classList.add("dedicacion");
        habilidades[9].classList.add("proyect");
    }
}


//detecto el scrolling para aplicar la animacion de la barra de habilidades
window.onscroll = function(){
    efectoHabilidades();
}



document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar la sección de skills
    const skillsSection = document.getElementById('skills');
    
    // Seleccionar todas las barras de progreso
    const progressBars = document.querySelectorAll('.barra-skill .progreso');
    
    // Función para activar las animaciones
    function activarAnimaciones() {
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }
    
    // Función para desactivar las animaciones
    function desactivarAnimaciones() {
        progressBars.forEach(bar => {
            bar.style.width = '0%';
        });
    }
    
    // Configurar el Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si la sección está visible al menos al umbral especificado
                activarAnimaciones();
            } else {
                // Si la sección ya no está visible
                desactivarAnimaciones();
            }
        });
    }, {
        threshold: 0.5 // Establece el umbral de visibilidad al 50%
    });
    
    // Iniciar observación
    if (skillsSection) {
        observer.observe(skillsSection);
    }
});




document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("contactForm").addEventListener("submit", async function (event) {
        event.preventDefault(); // Evita recargar la página

        const form = event.target;
        const formData = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/xyzezojr", {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" }
            });

            if (response.ok) {
                showAlert("¡Mensaje enviado con éxito!", "success");
                form.reset();
            } else {
                showAlert("Error al enviar el mensaje. Inténtalo de nuevo.", "error");
            }
        } catch (error) {
            console.error("Error:", error);
            showAlert("Error de conexión. Inténtalo más tarde.", "error");
        }
    });
});

/**
 * Función para mostrar una alerta flotante
 */
function showAlert(message, type) {
    // Crear el div de la alerta
    const alertDiv = document.createElement("div");
    alertDiv.classList.add("custom-alert", type === "success" ? "alert-success" : "alert-error");
    alertDiv.textContent = message;

    // Agregar la alerta al body
    document.body.appendChild(alertDiv);

    // Mostrar con animación
    setTimeout(() => {
        alertDiv.classList.add("show");
    }, 100);

    // Ocultar después de 5 segundos
    setTimeout(() => {
        alertDiv.classList.remove("show");
        setTimeout(() => alertDiv.remove(), 500);
    }, 5000);
}





















document.addEventListener("DOMContentLoaded", () => {
    const interestItems = document.querySelectorAll(".interest-item");
    const interestInfo = document.getElementById("interest-info");
    const interestTitle = document.getElementById("interest-title");
    const interestContent = document.getElementById("interest-content");
    const closeButton = document.getElementById("close-info");

    let hideTimeout;

    // Contenido de cada interés
    const interestData = {
        juegos: {
            title: "Juegos",
            content: "Me apasionan los videojuegos, especialmente los de estrategia y aventura. Disfruto tanto juegos AAA como títulos independientes innovadores. Algunos de mis favoritos son The Legend of Zelda, Minecraft y Age of Empires."
        },
        musica: {
            title: "Música",
            content: "Disfruto de la música en diferentes géneros, desde el rock clásico hasta la música electrónica. Siempre estoy explorando nuevas bandas y artistas."
        },
        peliculas: {
            title: "Películas",
            content: "Soy un amante del cine, especialmente del género de ciencia ficción y aventuras. Mis películas favoritas incluyen Inception y la saga de Star Wars."
        },
        libros: {
            title: "Libros",
            content: "Me encanta la lectura, especialmente los libros de ciencia ficción y fantasía. Algunos de mis favoritos son los de Isaac Asimov y J.R.R. Tolkien."
        },
        fotografia: {
            title: "Fotografía",
            content: "La fotografía es una de mis pasiones, me gusta capturar momentos especiales y explorar diferentes estilos de fotografía."
        },
        tecnologia: {
            title: "Tecnología",
            content: "Siempre estoy al día con las últimas innovaciones tecnológicas. Me apasiona el desarrollo de software y la inteligencia artificial."
        },
        deporte: {
            title: "Deporte",
            content: "Practico deportes regularmente para mantenerme en forma y activo. Me gusta el ciclismo y el levantamiento de pesas."
        },
        viajar: {
            title: "Viajar",
            content: "Explorar nuevos lugares y culturas es una de mis grandes pasiones. Cada viaje es una oportunidad para aprender y descubrir cosas nuevas."
        }
    };

    function isElementFullyVisible(element) {
        const rect = element.getBoundingClientRect();
        return rect.top >= 0 && rect.bottom <= window.innerHeight;
    }

    function ensureVisibility(element) {
        const rect = element.getBoundingClientRect();
        if (!isElementFullyVisible(element)) {
            window.scrollBy({
                top: rect.bottom - window.innerHeight + 20,
                behavior: "smooth"
            });
        }
    }

    // Mostrar información en el div fijo
    interestItems.forEach(item => {
        item.addEventListener("mouseenter", (event) => {
            clearTimeout(hideTimeout); // Evita que se oculte si el mouse vuelve a entrar

            const interest = event.currentTarget.getAttribute("data-interest");

            if (interestData[interest]) {
                interestTitle.textContent = interestData[interest].title;
                interestContent.textContent = interestData[interest].content;

                interestInfo.style.display = "block"; // Mostrar el cuadro
                interestInfo.style.opacity = "0"; // Iniciar opacidad en 0
                setTimeout(() => {
                    interestInfo.style.opacity = "1"; // Transición suave
                }, 50);

                // Asegurar que el recuadro y el botón sean 100% visibles
                ensureVisibility(interestInfo);
                ensureVisibility(closeButton);
            }
        });

        item.addEventListener("mouseleave", () => {
            // Ocultar después de 2 segundos si el mouse no está encima
            hideTimeout = setTimeout(() => {
                interestInfo.style.opacity = "0";
                setTimeout(() => {
                    interestInfo.style.display = "none";
                }, 300);
            }, 1000);
        });
    });

    // Mantener el cuadro visible si el mouse está sobre él
    interestInfo.addEventListener("mouseenter", () => {
        clearTimeout(hideTimeout);
    });

    interestInfo.addEventListener("mouseleave", () => {
        hideTimeout = setTimeout(() => {
            interestInfo.style.opacity = "0";
            setTimeout(() => {
                interestInfo.style.display = "none";
            }, 300);
        }, 2000);
    });

    // Cerrar manualmente con el botón de cierre
    closeButton.addEventListener("click", () => {
        interestInfo.style.opacity = "0";
        setTimeout(() => {
            interestInfo.style.display = "none";
        }, 300);
    });
});












document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar la sección de skills
    const skillsSection = document.getElementById('skills');
    
    // Seleccionar todas las barras de progreso
    const progressBars = document.querySelectorAll('.barra-skill .progreso');
    
    // Función para activar las animaciones
    function activarAnimaciones() {
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }
    
    // Función para desactivar las animaciones
    function desactivarAnimaciones() {
        progressBars.forEach(bar => {
            bar.style.width = '0%';
        });
    }
    
    // Configurar el Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si la sección está visible al menos al umbral especificado
                activarAnimaciones();
            } else {
                // Si la sección ya no está visible
                desactivarAnimaciones();
            }
        });
    }, {
        threshold: 0.5 // Establece el umbral de visibilidad al 50%
    });
    
    // Iniciar observación
    if (skillsSection) {
        observer.observe(skillsSection);
    }
});

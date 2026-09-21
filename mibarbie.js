document.addEventListener("DOMContentLoaded", () => {
    const mainText = document.getElementById("main-text");
    const container = document.getElementById("container");
    const lilyContainer = document.getElementById("lily-container");
    
    let isAnimating = false;
    const allNames = [];
    
    mainText.classList.add('pulse');
    mainText.title = "¡Haz clic en mí!";
    
    mainText.addEventListener('click', startAnimation);
    
    function startAnimation() {
        if (isAnimating) return;
        isAnimating = true;
        
        mainText.classList.remove('pulse');
        mainText.title = "";
        
        moveRandomly(mainText);
        
        setTimeout(spawnNames, 1000);
    }
    
    function moveRandomly(element, interval = 1500) {
        if (element.isConverging) return;
        
        const maxX = window.innerWidth;
        const maxY = window.innerHeight;
        
        // Evita que los textos se salgan mucho de la pantalla
        const randomX = Math.random() * (maxX - 100) + 50;
        const randomY = Math.random() * (maxY - 100) + 50;
        
        element.style.left = `${randomX}px`;
        element.style.top = `${randomY}px`;
        
        element.moveTimeout = setTimeout(() => moveRandomly(element, interval), interval);
    }
    
    function spawnNames() {
        let spawnCount = 0;
        const totalToSpawn = 60;
        
        const spawnInterval = setInterval(() => {
            if (spawnCount >= totalToSpawn) {
                clearInterval(spawnInterval);
                setTimeout(convergeNames, 3000); // Esperar 3 segundos antes de juntar todos
                return;
            }
            
            const newName = document.createElement("div");
            newName.className = "barby-text";
            newName.innerText = "barby";
            
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight;
            
            newName.style.left = `${startX}px`;
            newName.style.top = `${startY}px`;
            const randomScale = 0.4 + Math.random() * 0.8;
            newName.style.transform = `translate(-50%, -50%) scale(${randomScale})`;
            
            container.appendChild(newName);
            allNames.push(newName);
            
            setTimeout(() => {
                moveRandomly(newName, 1000 + Math.random() * 1000);
            }, 100);
            
            spawnCount++;
        }, 80); // Aparecen rápidamente uno tras otro
    }
    
    function convergeNames() {
        mainText.isConverging = true;
        clearTimeout(mainText.moveTimeout);
        
        allNames.forEach(name => {
            name.isConverging = true;
            clearTimeout(name.moveTimeout);
        });
        
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const allElements = [mainText, ...allNames];
        
        allElements.forEach(el => {
            el.style.transition = "all 2s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
            el.style.left = `${centerX}px`;
            el.style.top = `${centerY}px`;
            el.style.transform = "translate(-50%, -50%) scale(0) rotate(360deg)";
            el.style.opacity = "0";
        });
        
        // Cuando todos se juntan y desaparecen, aparece el lirio
        setTimeout(() => {
            lilyContainer.classList.add('show');
            
            setTimeout(() => {
                allElements.forEach(el => el.remove());
            }, 1000);
        }, 2000);
    }
});

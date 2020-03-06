class Text {
    constructor(root, x, y, size, text) {
        this.root = root;
        this.domElement = document.createElement("p");
        this.domElement.style.fontSize = `${size}px`;
        this.domElement.style.marginTop = `${y}%`;
        this.domElement.style.marginLeft = `${x}%`;
        this.domElement.innerText = text;
        root.appendChild(this.domElement);
    }

    removeDOM() {
        this.root.removeChild(this.domElement);
    }
};
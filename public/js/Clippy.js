class Clippy {
    constructor(txtBoardEl, btnTxt = "Copy") {
        this.copyBtn;
        this.copyBtnTxt = btnTxt;
        this.boardEl = txtBoardEl;
        this.boardElContent;
        this.clipboardApi = this.isClipboardApi();
        this.init();
    }

    init() {
        this.createCopyBtn();
    }

    createCopyBtn() {
        this.copyBtn = document.createElement("BUTTON");
        this.copyBtn.id = "copyButton";
        this.copyBtn.classList.add("j-clippyButton");
        this.copyBtn.innerHTML = this.copyBtnTxt;
        
        // Add listener to the button
        this.copyBtn.addEventListener("click", this.copyBoardElContent.bind(this));
        
        // Append the button into the DOM
        const container = this.boardEl.parentElement;    
        container.insertBefore(this.copyBtn, this.boardEl);
    }

    copyBoardElContent() {
        if(this.isBoardElEmpty(this.boardEl)) {
            console.warn("There is nothing to copy");
            return;
        } else {
            if(this.clipboardApi) {
                this.useClipboardApi(); 
            } else {
                this.useClipboardFb();
            }
        }
    }

    /*
    * @param HTML element
    * Check if the element has no value or text content
    */
    isBoardElEmpty(boardEl) {
        if(this.isInput(boardEl)) {
            if(boardEl.value == "" || boardEl.value == undefined) {
                return true;
            } else {
                return false;
            }
        } else {
            if(boardEl.textContent == "" || boardEl.textContent == undefined) {
                return true;
            } else {
                return false;
            }
        }
    }

    /*
    * Check if the board element is an INPUT or a TEXTAREA
    */
    isInput(boardEl) {
        if(boardEl.tagName == "INPUT" || boardEl.tagName == "TEXTAREA") {
            return true;
        } else {
            return false;
        }
    }

    /*
    * Get the content of the board element and
    * save it into a variable
    */
    getBoardElContent() {
        if(this.isInput(this.boardEl)) {
            this.boardElContent = this.boardEl.value;
        } else {
            this.boardElContent = this.boardEl.textContent;
        }
    }
    
    /*
    * Check if the browser supports Clipboard API
    */
    isClipboardApi() {
        if(navigator.clipboard != undefined) {
            return true;
        } else {
            return false;
        }
    }

    /*
    * Use Clipboard API to copy the
    * content inside the element
    */
    useClipboardApi() {
        this.getBoardElContent();
        // Enable read/write permissions on Clipboard
        navigator.permissions.query({name: "clipboard-write"});
        navigator.permissions.query({name: "clipboard-read"});
        
        // Write text on Clipboard
        navigator.clipboard.writeText(this.boardElContent).then(() => {      
            console.log("Clipped!");
            return;
        }); 
    }

    /*
    * Fallback for browsers that doesn't support
    * Clipboard API
    */
    useCliboardFb() {
        this.getBoardElContent();
        console.warn("Your browser doesn't support Clipboard API");
        return;
    }
}



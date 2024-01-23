const myFilesPage = {
  header: renderHeader("ملفاتي", "قائمة الملفات التي تم رفعها الى السيرفر"),
  render() {
    // use the cache to optimize ui
    if (cachedFilesList.length) {
      let renderedFileSList = "";
      for (let r = 0; r < cachedFilesList.length; r++) {
        renderedFileSList += this.renderFileItem(cachedFilesList[r]);
        filesList = mainSectionContainer.innerHTML = `
            ${this.header}
            ${this.renderTools()}
            ${renderedFileSList}
         `;
      }
    }

    socket.sendObject({ event: "get-pathes", data: { path: "/" } });
    socket.addEventListener("message", (ev) => {
      if (ev.data) {
        const payload = parseMessage(ev.data);
        cachedFilesList = payload.data.pathes;
        if ((payload.event = "get-pathes-response")) {
          const html = payload.data.pathes
            .map((p) => {
              return this.renderFileItem(p);
            })
            .join("");
          filesList = mainSectionContainer.innerHTML = `
          ${this.header}
          ${this.renderTools()}
          ${html}
        `;
        }
      }
    });
  },
  renderFileItem(p) {
    const { name, size, is_directory, path } = p;
    const svgSrc = is_directory ? "./imgs/svgs/dir.svg" : "./imgs/svgs/txt.svg";
    console.log(calculateSize(size));
    return /*html*/ `
    <div class="file-container">
        <div class="file-details">
          <img src="${svgSrc}" />
            <h5>${name}</h5>
        </div>
        <h6>الحجم : ${calculateSize(size)}</h6>

        <progress class="download-progress-bar" value="0" max="100"></progress>
        <div class="file-actions">
          <img src="./imgs/svgs/download.svg" class="download-icon" onclick="downloadFile(this,'${path}')"/>
          <img src="./imgs/svgs/delete.svg" />
        </div>
    </div>
    `;
  },
  renderTools() {
    return /*html*/ `
      <div class="page-tools-container">
        <div class="actions">
          <div class="icon-btn" onclick="uploadFile(this)">
             <object class="svg" type="image/svg+xml" data="./imgs/svgs/upload.svg"></object>
          </div>
        </div>
        <div class="filter">
            <input type="search" />
        </div>
      </div>
    `;
  },
};

function downloadFile(e, url) {
  // $(".svg")
  //   .getSVGDocument()
  //   .querySelector("path")
  //   .setAttribute("fill", "red");

  const parent = e.closest(".file-container");
  if (!parent) return;
  const progress = parent.querySelector("progress");
  progress.style.opacity = 1;
}

function uploadFile() {}

function page1(){
  let state = {pagename : "page 1"}
  return {
      render(){
          this.runBeforeFirstRender()
          this.renderDom()
          this.runAfterFirstRender()
      },
      renderDom(){
          this.runBeforeEveryRender()
          root.innerHTML = this.renderHtml()
          this.runAfterEveryRender()
      },
      renderHtml(){
          return(`<h1>Page 1 is Here ${state.pagename} </h1>`)
      },
      runBeforeEveryRender(){},
      runAfterEveryRender(){},
      runBeforeFirstRender(){},
      runAfterFirstRender() {
          div.addEventListener("click",this.callBAck)
      },
      cleanUp(){
          div.removeEventListener("click",this.callBAck)
      },
      setState(object){
          state = object
          this.renderDom()
      },
      callBAck(){
          console.log("div c p 1")
      }

  }
}
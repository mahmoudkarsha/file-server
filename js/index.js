let listOpened = true;
let pathname = "";
routeTo(pathname);

// initialization
loopThroughParentsNode(navLinkTextElements, (pNode) => {
  pNode.addEventListener(
    "click",
    (e) => {
      console.log("click");
      if (pathname === e.currentTarget.attributes.link.nodeValue) return;
      pathname = e.currentTarget.attributes.link.nodeValue;

      routeTo(pathname);
      loopThroughParentsNode(navLinkTextElements, (pNode) => {
        pNode === e.currentTarget
          ? pNode.classList.add("selected")
          : pNode.classList.remove("selected");
      });
    },
    true
  );
});

function handleListIconClick() {
  listOpened = !listOpened;
  loopThroughNodes(
    navLinkTextElements,
    navLinkSeperatorTextElements,
    (node) => {
      node.style.opacity = listOpened ? 1 : 0;
      node.style.width = listOpened ? "140px" : "0px";
    }
  );
}

function routeTo(pathname) {
  window.history.replaceState(null, "", "/" + pathname);
  mainSectionContainer.innerHTML = "";
  switch (pathname) {
    case "":
      return myFilesPage.render();
    case "myfiles":
      return myFilesPage.render();
    case "bookmarks":
      return renderBookmarks();
    case "aboutus":
      return renderAboutUs();
    case "logout":
      return renderLogout();
    default:
      return renderNotFound();
  }
}

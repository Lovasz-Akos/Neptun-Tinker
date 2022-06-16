// ==UserScript==
// @name           Neptun Tinker (NPU Compatibility ver.)
// @namespace      http://example.org
// @description    NPU++
// @version        1.3.5
// @downloadURL    https://github.com/Lovasz-Akos/Neptun-Tinker/raw/master/neptun_tinker.user.js
// @updateURL      https://github.com/Lovasz-Akos/Neptun-Tinker/raw/master/neptun_tinker.user.js
// @include        https://*neptun*/*hallgato*/*
// @include        https://*neptun*/*oktato*/*
// @include        https://*hallgato*.*neptun*/*
// @include        https://*oktato*.*neptun*/*
// @include        https://netw*.nnet.sze.hu/hallgato/*
// @include        https://nappw.dfad.duf.hu/hallgato/*
// @include        https://host.sdakft.hu/*
// @include        https://neptun.ejf.hu/ejfhw/*
// @grant          GM.xmlHttpRequest
// @grant          GM_xmlhttpRequest
// @grant          GM.getValue
// @grant          GM_getValue
// @grant          GM.setValue
// @grant          GM_setValue
// @grant          GM.info
// @grant          GM_info
// @require        https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js
// ==/UserScript==

(function() {
    "use strict";
    var nep = {
        init: async function() {

            setTimeout(this.courseCollison, 2500);
            setTimeout(this.RefreshColoring, 500);
            setTimeout(this, 1000);

            var table = document.getElementById("c_messages_gridMessages_bodytable");
            var cell = table.getElementsByClassName("scrollablebody");
            for (var j = 1, row;
                (row = table.rows[j]); j++) {
                let date = row.cells[7].textContent;
                let str = date.split(".");
                let str2 = str[3].split(":");
                let newDate = new Date(
                    str[0],
                    str[1] - 1,
                    str[2],
                    str2[0],
                    str2[1],
                    str2[2]
                );
                let now = Date.now();
                let newText;
                if (Math.floor((now - newDate) / (1000 * 60 * 60)) < 1) {
                    newText =
                        Math.floor(Math.floor(now - newDate) / (1000 * 60)) + " perce";
                } else if (Math.floor((now - newDate) / (1000 * 60 * 60 * 24)) < 1) {
                    newText =
                        Math.floor(Math.floor(now - newDate) / (1000 * 60 * 60)) + " órája";
                } else if (Math.floor((now - newDate) / (1000 * 60 * 60 * 24)) < 365) {
                    newText =
                        Math.floor(Math.floor(now - newDate) / (1000 * 60 * 60 * 24)) +
                        " napja";
                } else {
                    newText =
                        Math.floor(
                            Math.floor(now - newDate) / (1000 * 60 * 60 * 24 * 365)
                        ) + " éve";
                }
                if (newText != null) {
                    row.cells[7].textContent = newText;
                }
            }
        },

        RefreshColoring: function() {
            setTimeout(this.RefreshColoring, 500);
            var i;
            var max_num = document.getElementById(
                "c_messages_gridMessages_ddlPageSize"
            ).value;
            for (i = 0; i < max_num; i++) {
                const element = document.getElementsByClassName("link")[i];

                //NEM KÍVÁNATOS ÜZENETEK

                if (
                    element.innerHTML == "Kurzus órarendi változás" ||
                    element.innerHTML.toUpperCase().includes("ERASMUS") ||
                    element.innerHTML.toUpperCase().includes("SPORT") ||
                    element.innerHTML.toUpperCase().includes("ANGOL") ||
                    element.innerHTML.toUpperCase().includes("MEFOB") ||
                    element.innerHTML.toUpperCase().includes("KURZUS TÖRLÉSE ÓRARENDRŐL")
                ) {
                    const id = element.parentElement.parentElement.id;
                    document.getElementById(id).style.display = "none";
                }

                //JEGYBEÍRÁS
                else if (
                    element.innerHTML.includes("jegybeírás történt") ||
                    element.innerHTML.includes("vizsgajegy került beírásra") ||
                    element.innerHTML.includes("vizsgaeredménye módosítva")
                ) {
                    const id = element.parentElement.parentElement.id;
                    document.getElementById(id).classList.remove("Row1_Bold");
                    if (
                        document.getElementById(id).children[5].children[0].alt ==
                        "Elolvasott üzenet"
                    ) {
                        document.getElementById(id).style.backgroundColor = "#2a732e";
                    } else {
                        document.getElementById(id).style.backgroundColor = "#275c2b";
                        document.getElementById(id).style.color = "white";
                        console.log(document.getElementById(id).children[6].children[0]);
                        // document.getElementById(id).children[6].children[0].classList.remove("link");
                    }
                }

                //VIZSGAKIÍRÁS
                else if (element.innerHTML.includes("Új vizsgakiírás")) {
                    const id = element.parentElement.parentElement.id;
                    document.getElementById(id).classList.remove("Row1_Bold");
                    document.getElementById(id).style.color = "white";

                    document
                        .getElementById(id)
                        .children[6].children[0].style.setProperty(
                            "color",
                            "white",
                            "important"
                        );

                    if (
                        document.getElementById(id).children[5].children[0].alt ==
                        "Elolvasott üzenet"
                    ) {
                        document.getElementById(id).style.backgroundColor = "#6F9EFF";
                    } else {
                        document.getElementById(id).style.backgroundColor = "#3160F9";

                        console.log(document.getElementById(id).children[6].children[0]);
                    }
                }

                //ÖSZTÖNDÍJ

                // console.log(document.getElementById(id).children[6].children[0]);
                // document.getElementById(id).children[6].children[0].classList.remove("link");
                else if (element.innerHTML.toUpperCase().includes("ÖSZTÖNDÍJ")) {
                    const id = element.parentElement.parentElement.id;
                    document.getElementById(id).classList.remove("Row1_Bold");
                    if (
                        document.getElementById(id).children[5].children[0].alt ==
                        "Elolvasott üzenet"
                    ) {
                        document.getElementById(id).style.backgroundColor = "#85851c";
                    } else {
                        document.getElementById(id).style.backgroundColor = "#636319";
                        console.log(document.getElementById(id).children[6].children[0]);
                        // document.getElementById(id).children[6].children[0].classList.remove("link");
                    }
                } else if (element.innerHTML.toUpperCase().includes("ÜGYINTÉZŐ")) {
                    const id = element.parentElement.parentElement.id;
                    document.getElementById(id).classList.remove("Row1_Bold");
                    document.getElementById(id).children[6].children[0].style.setProperty("color", "white", "important");
                    if (
                        document.getElementById(id).children[5].children[0].alt ==
                        "Elolvasott üzenet"
                    ) {
                        document.getElementById(id).style.backgroundColor = "#7d1b19";
                    } else {
                        document.getElementById(id).style.backgroundColor = "#520f0e";
                    }
                    document.getElementById(id).style.color = "white";
                }
            }
        },

    };
    nep.init();
})();

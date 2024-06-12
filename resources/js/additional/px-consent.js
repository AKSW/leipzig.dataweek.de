(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/*
 *
 * JS: PX Consent
 *
 * Version 1.1 / 19.9.2022
 *
 */
// ------------------------------------------
// Dom ready
// use: ready(function() { alert('hello'); });
if (window.ready !== "function") {
  window.ready = function (fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  };
} // --------------------------------------
// Container suchen


ready(function () {
  var elementsWithConsent = document.querySelectorAll('[data-consent]');
  var cookies = document.cookie.split(';');

  for (var c = 0; c < cookies.length; c++) {
    var cookieName = cookies[c].split('=');
    cookies[c] = cookieName[0].replace(/\s/g, '');
  }

  for (var i = 0; i < elementsWithConsent.length; i++) {
    if (cookies.includes(elementsWithConsent[i].getAttribute('data-consent-name'))) {
      // Consent entfernen
      pxConsentRemove(elementsWithConsent[i], false);
    } else {
      // Consent-Funktion anbinden
      pxConsentInit(elementsWithConsent[i]);
    }
  }
}); // --------------------------------------
// Elemente freischalten

var pxConsentRemove = function pxConsentRemove(consentElement) {
  var active = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var consentCallback = consentElement.getAttribute('data-consent-callback');
  var consentReady = consentElement.querySelector('[data-consent-ready]');
  var consentForm = consentElement.querySelector('[data-consent-form]');
  var consentPreviews = consentElement.querySelectorAll('[data-consent-preview]');

  if (typeof consentForm != 'undefined' && consentForm != null) {
    consentForm.remove();
  }

  for (var p = 0; p < consentPreviews.length; p++) {
    consentPreviews[p].remove();
  }

  if (typeof window[consentCallback] === 'function') {
    window[consentCallback](consentReady, active);
  }

  consentElement.removeAttribute('data-consent');
  consentElement.removeAttribute('data-consent-name');
}; // --------------------------------------
// Consent initialisieren


var pxConsentInit = function pxConsentInit(consentElement) {
  var consentName = consentElement.getAttribute('data-consent-name');
  var consentFormButton = consentElement.querySelector('[data-consent-form] button[data-consent-form-button]');
  var consentFormCheckbox = consentElement.querySelector('[data-consent-form] input[data-consent-form-setcookie]');
  consentFormButton.addEventListener('click', function (event) {
    event.preventDefault(); // Element freischalten

    pxConsentRemove(consentElement, true);

    if (consentFormCheckbox.checked) {
      // alle weiteren Elemente mit dem gleich Schlüsselnamen suchen und  freischalten
      var allConsentElements = document.querySelectorAll('[data-consent][data-consent-name="' + consentName + '"]');

      for (var j = 0; j < allConsentElements.length; j++) {
        pxConsentRemove(allConsentElements[j], false);
      } // Auswahl in einem Cookie speichern


      var expires = new Date();
      expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000);
      document.cookie = consentName + '=; expires=' + expires.toUTCString() + '; path=/;';
    }
  });
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvanMvYWRkaXRpb25hbC9weC1jb25zZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBLElBQUksTUFBTSxDQUFDLEtBQVAsS0FBaUIsVUFBckIsRUFBaUM7QUFDL0IsRUFBQSxNQUFNLENBQUMsS0FBUCxHQUFlLFVBQVMsRUFBVCxFQUFhO0FBQzFCLFFBQUksUUFBUSxDQUFDLFdBQVQsR0FBdUIsUUFBUSxDQUFDLFVBQVQsS0FBd0IsVUFBL0MsR0FBNEQsUUFBUSxDQUFDLFVBQVQsS0FBd0IsU0FBeEYsRUFBa0c7QUFDaEcsTUFBQSxFQUFFO0FBQ0gsS0FGRCxNQUVPO0FBQ0wsTUFBQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLEVBQTlDO0FBQ0Q7QUFDRixHQU5EO0FBT0QsQyxDQUlEO0FBQ0E7OztBQUNBLEtBQUssQ0FBQyxZQUFXO0FBRWYsTUFBTSxtQkFBbUIsR0FBRyxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsZ0JBQTFCLENBQTVCO0FBRUEsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLE1BQVQsQ0FBZ0IsS0FBaEIsQ0FBc0IsR0FBdEIsQ0FBaEI7O0FBRUEsT0FBSyxJQUFJLENBQUMsR0FBRyxDQUFiLEVBQWdCLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBNUIsRUFBb0MsQ0FBQyxFQUFyQyxFQUF5QztBQUN2QyxRQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsQ0FBRCxDQUFQLENBQVcsS0FBWCxDQUFpQixHQUFqQixDQUFqQjtBQUNBLElBQUEsT0FBTyxDQUFDLENBQUQsQ0FBUCxHQUFhLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBYyxPQUFkLENBQXVCLEtBQXZCLEVBQThCLEVBQTlCLENBQWI7QUFDRDs7QUFFRCxPQUFLLElBQUksQ0FBQyxH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QixLQUFHLEVBQUgsR0FBTSxFQUFOLEdBQVMsRUFBVCxHQUFZLElBQWpEO0FBQ0EsTUFBQSxRQUFRLENBQUMsTUFBVCxHQUFrQixXQUFXLEdBQUcsYUFBZCxHQUE0QixPQUFPLENBQUMsV0FBUixFQUE1QixHQUFrRCxXQUFwRTtBQUVEO0FBR0YsR0F4QkQ7QUEwQkQsQ0FsQ0QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKlxuICpcbiAqIEpTOiBQWCBDb25zZW50XG4gKlxuICogVmVyc2lvbiAxLjEgLyAxOS45LjIwMjJcbiAqXG4gKi9cblxuXG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRG9tIHJlYWR5XG4vLyB1c2U6IHJlYWR5KGZ1bmN0aW9uKCkgeyBhbGVydCgnaGVsbG8nKTsgfSk7XG5pZiAod2luZG93LnJlYWR5ICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgd2luZG93LnJlYWR5ID0gZnVuY3Rpb24oZm4pIHtcbiAgICBpZiAoZG9jdW1lbnQuYXR0YWNoRXZlbnQgPyBkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIgOiBkb2N1bWVudC5yZWFkeVN0YXRlICE9PSBcImxvYWRpbmdcIil7XG4gICAgICBmbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZm4pO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIENvbnRhaW5lciBzdWNoZW5cbnJlYWR5KGZ1bmN0aW9uKCkge1xuXG4gIGNvbnN0IGVsZW1lbnRzV2l0aENvbnNlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jb25zZW50XScpO1xuXG4gIGNvbnN0IGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKVxuXG4gIGZvciAobGV0IGMgPSAwOyBjIDwgY29va2llcy5sZW5ndGg7IGMrKykge1xuICAgIGxldCBjb29raWVOYW1lID0gY29va2llc1tjXS5zcGxpdCgnPScpO1xuICAgIGNvb2tpZXNbY10gPSBjb29raWVOYW1lWzBdLnJlcGxhY2UoIC9cXHMvZywgJycpO1xuICB9ICBcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzV2l0aENvbnNlbnQubGVuZ3RoOyBpKyspIHtcblxuICAgIGlmICggY29va2llcy5pbmNsdWRlcyhlbGVtZW50c1dpdGhDb25zZW50W2ldLmdldEF0dHJpYnV0ZSgnZGF0YS1jb25zZW50LW5hbWUnKSkgKSB7XG5cbiAgICAgIC8vIENvbnNlbnQgZW50ZmVybmVuXG4gICAgICBweENvbnNlbnRSZW1vdmUoZWxlbWVudHNXaXRoQ29uc2VudFtpXSxmYWxzZSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAvLyBDb25zZW50LUZ1bmt0aW9uIGFuYmluZGVuXG4gICAgICBweENvbnNlbnRJbml0KGVsZW1lbnRzV2l0aENvbnNlbnRbaV0pO1xuXG4gICAgfVxuXG4gIH1cblxuXG59KTtcblxuXG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFbGVtZW50ZSBmcmVpc2NoYWx0ZW5cbmxldCBweENvbnNlbnRSZW1vdmUgPSBmdW5jdGlvbiAoY29uc2VudEVsZW1lbnQsYWN0aXZlID0gZmFsc2UpIHtcblxuICBsZXQgY29uc2VudENhbGxiYWNrID0gY29uc2VudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbnNlbnQtY2FsbGJhY2snKTtcbiAgbGV0IGNvbnNlbnRSZWFkeSA9IGNvbnNlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnNlbnQtcmVhZHldJyk7XG4gIGxldCBjb25zZW50Rm9ybSA9IGNvbnNlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnNlbnQtZm9ybV0nKTtcbiAgbGV0IGNvbnNlbnRQcmV2aWV3cyA9IGNvbnNlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNvbnNlbnQtcHJldmlld10nKTtcblxuICBpZiAoIHR5cGVvZihjb25zZW50Rm9ybSkgIT0gJ3VuZGVmaW5lZCcgJiYgY29uc2VudEZvcm0gIT0gbnVsbCApIHtcbiAgICBjb25zZW50Rm9ybS5yZW1vdmUoKTtcbiAgfVxuXG4gIGZvciAobGV0IHAgPSAwOyBwIDwgY29uc2VudFByZXZpZXdzLmxlbmd0aDsgcCsrKSB7XG4gICAgY29uc2VudFByZXZpZXdzW3BdLnJlbW92ZSgpO1xuICB9XG5cbiAgaWYgKCB0eXBlb2Ygd2luZG93W2NvbnNlbnRDYWxsYmFja10gPT09ICdmdW5jdGlvbicgKSB7XG4gICAgd2luZG93W2NvbnNlbnRDYWxsYmFja10oY29uc2VudFJlYWR5LGFjdGl2ZSk7XG4gIH1cblxuICBjb25zZW50RWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtY29uc2VudCcpO1xuICBjb25zZW50RWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtY29uc2VudC1uYW1lJyk7XG5cbn1cblxuXG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBDb25zZW50IGluaXRpYWxpc2llcmVuXG5sZXQgcHhDb25zZW50SW5pdCA9IGZ1bmN0aW9uIChjb25zZW50RWxlbWVudCkge1xuXG5cbiAgbGV0IGNvbnNlbnROYW1lID0gY29uc2VudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbnNlbnQtbmFtZScpO1xuICBsZXQgY29uc2VudEZvcm1CdXR0b24gPSBjb25zZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb25zZW50LWZvcm1dIGJ1dHRvbltkYXRhLWNvbnNlbnQtZm9ybS1idXR0b25dJyk7XG4gIGxldCBjb25zZW50Rm9ybUNoZWNrYm94ID0gY29uc2VudEVsZW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29uc2VudC1mb3JtXSBpbnB1dFtkYXRhLWNvbnNlbnQtZm9ybS1zZXRjb29raWVdJyk7XG5cblxuICBjb25zZW50Rm9ybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oZXZlbnQpe1xuXG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgLy8gRWxlbWVudCBmcmVpc2NoYWx0ZW5cbiAgICBweENvbnNlbnRSZW1vdmUoY29uc2VudEVsZW1lbnQsdHJ1ZSk7XG5cbiAgICBpZiAoIGNvbnNlbnRGb3JtQ2hlY2tib3guY2hlY2tlZCApIHtcblxuICAgICAgLy8gYWxsZSB3ZWl0ZXJlbiBFbGVtZW50ZSBtaXQgZGVtIGdsZWljaCBTY2hsw7xzc2VsbmFtZW4gc3VjaGVuIHVuZCAgZnJlaXNjaGFsdGVuXG4gICAgICBsZXQgYWxsQ29uc2VudEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY29uc2VudF1bZGF0YS1jb25zZW50LW5hbWU9XCInKyBjb25zZW50TmFtZSArJ1wiXScpO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBhbGxDb25zZW50RWxlbWVudHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgcHhDb25zZW50UmVtb3ZlKGFsbENvbnNlbnRFbGVtZW50c1tqXSxmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEF1c3dhaGwgaW4gZWluZW0gQ29va2llIHNwZWljaGVyblxuICAgICAgbGV0IGV4cGlyZXMgPSBuZXcgRGF0ZSgpO1xuICAgICAgZXhwaXJlcy5zZXRUaW1lKGV4cGlyZXMuZ2V0VGltZSgpICsgKDMwKjI0KjYwKjYwKjEwMDApKTtcbiAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvbnNlbnROYW1lICsgJz07IGV4cGlyZXM9JytleHBpcmVzLnRvVVRDU3RyaW5nKCkrJzsgcGF0aD0vOyc7XG5cbiAgICB9XG5cblxuICB9KTtcblxufVxuXG5cbiJdfQ==

import { TypewriteRec } from 'lib.js';

TypewriteRec('#contact-phone', 'Phone: +49 1516 3213 748', 0, 15, false, () => {
  TypewriteRec('#contact-email', 'E-Mail: nikolayhadzhiev@outlook.com', 0, 15, false, () => {
    TypewriteRec('#contact-other', 'Other Links:', 0, 15, false, () => {
      TypewriteRec('#contact-github', 'My GitHub', 0, 15, true, null);
    }, 150);
  }, 150);
}, 150);
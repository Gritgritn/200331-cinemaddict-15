import AbstractView from './abstract.js';
import {RankToTextContent} from '../const.js';

const createProfileTemplate = (rank) => `
  <section class="header__profile profile">
  <p class="profile__rating">${RankToTextContent[rank]}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>
`;

class ProfileView extends AbstractView {
  constructor(rank) {
    super();
    this._rank = rank;
  }

  getTemplate() {
    return createProfileTemplate(this._rank);
  }
}

export default ProfileView;

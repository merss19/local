const profile =`
    <div class="profile">
        <div class="profile__content row hide">
            <ul class="breadcrumb col-sm-12">
                <li><a href="profile">Профиль</a></li>
                <li><a href="balance">Баланс</a></li>
            </ul>
            <div class="profile__form user-form user-form_static col-sm-6">
                <div class="user-form__content">
                    <div class="user-form__items"></div>
                    <div class="user-form__btn">
                        <button type="button" class="btn btn-secondary" data-btn="edit">Редактировать</button>
                    </div>
                </div>
               <div class="user-form__notice hide">Сохранение</div>
            </div>
            <div class="profile__form user-form user-form_edit hide col-sm-6">
                <div class="user-form__items"></div>
                <div class="user-form__btn">
                    <button type="button" class="btn btn-secondary" data-btn="save">Сохранить</button>
                </div>
            </div>
         </div>
         <div class="profile__notice">Загружается</div>
    </div>
    `

export default  profile
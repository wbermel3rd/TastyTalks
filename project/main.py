from flask import Flask, abort, render_template, request, redirect, url_for, session, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_login import login_user, login_required, current_user, logout_user

main = Blueprint('main', __name__, template_folder='templates')

@main.route('/')
@login_required
def index():
    return render_template('index.html')
    # if('username') in session:
    #     return render_template('home.html', username=session['username'])
    # else:
    #     return render_template('home.html')
    
@main.route('/user-profile')
@login_required
def profile():
    return render_template('user-profile.html', full_name=current_user.full_name, username=current_user.username, password=current_user.password)
    # if request.method == 'POST':
    #     username = request.form['username']
    #     pw = request.form['password']
    

if __name__ == '__main__':
    main.run(debug=True)

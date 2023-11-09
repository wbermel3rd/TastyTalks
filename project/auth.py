from flask import render_template, request, redirect, url_for, Blueprint, flash
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, login_required, logout_user
from .models import User
from . import db

auth = Blueprint('auth', __name__, template_folder='templates')

@auth.route('/user-login')
def login():
    return render_template('user-login.html')
@auth.route('/user-login', methods=['POST'])
def login_post():
    username = request.form.get('username')
    password = request.form.get('password')
    remember = True if request.form.get('remember') else False
    user = User.query.filter_by(username=username).first()

    if not user or not check_password_hash(user.password, password):
        flash('Please check your login details and try again.')
        return redirect(url_for('auth.user-login'))
    
    login_user(user, remember=remember)
    return redirect(url_for('main.profile'))

@auth.route('/user-register')
def register():
    return render_template('user-register.html')
    
@auth.route('/user-register', methods=['POST'])
def register_post():
    username = request.form.get('username')
    full_name = request.form.get('full_name')
    password = request.form.get('password')

    user = User.query.filter_by(username=username).first()

    if user:
        flash('Username already exists')
        return redirect(url_for(auth.register))
    #make the new user and commit it to the session
    new_user = User(username=username, full_name=full_name, password=generate_password_hash(password, method='sha256'))
    db.session.add(new_user)
    db.session.commit()
    return redirect(url_for('auth.user-login'))


@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('main.index'))


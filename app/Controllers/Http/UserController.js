'use strict';

const User = use('App/Models/User');

class UserController {
  async index(ctx) {
    const users = await User.all();
    return ctx.view.render('user.index', { users: users.toJSON() });
  }

  async show(ctx) {
    const user = await User.find(ctx.params.id);
    return ctx.view.render('user.show', { user: user.toJSON() });
  }

  async create(ctx) {
    const time = new Date().getTime();
    const user = new User();
    user.username = `GDS_${time}`;
    user.email = `GDS_${time}@divam.com`;
    user.password = 'GDS@divam.com';
    await user.save();
    ctx.response.route('users');
  }

  async edit(ctx) {
    const user = await User.find(ctx.params.id);
    const time = new Date().getTime();
    user.username = `GDS_new_${time}`;
    await user.save();
    ctx.response.route('users');
  }

  async destroy(ctx) {
    const user = await User.find(ctx.params.id);
    await user.delete();
    ctx.response.route('users');
  }
}

module.exports = UserController;

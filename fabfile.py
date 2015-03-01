from fabric.api import task, env, run
from fabric.contrib.project import rsync_project


env.hosts = ['honfs.wtf']
env.user = 'honfs'
env.base_dir = '/srv/honfs'
env.pip = env.base_dir + '/venv/bin/pip'


@task
def deploy():
    rsync_project(env.base_dir, './', exclude=['.git', '.gitignore', '*.pyc',
                                               '.idea', 'app.db'])

    pip_cmd = '{0} install -U -r {1}/prod-requirements.txt'.format(
        env.pip, env.base_dir)

    run(pip_cmd)

    # TODO graceful reloading
    # http://uwsgi-docs.readthedocs.org/en/latest/articles/TheArtOfGracefulReloading.html
    run('sudo /usr/bin/service uwsgi reload')

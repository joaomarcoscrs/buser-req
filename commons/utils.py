from libgravatar import Gravatar


def gravatar_url(email):
    g = Gravatar(email)
    return g.get_image(size=200)
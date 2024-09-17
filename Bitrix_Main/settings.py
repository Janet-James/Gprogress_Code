

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'r$ham&1y3tc*2+pg#xs27s55%l-@)=r5jyqr*ouxmj!r-tjlng'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition

CORS_ORIGIN_ALLOW_ALL=True

CORS_ALLOW_METHODS = (
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
)

CORS_ALLOW_HEADERS = (
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
)


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',  
    'bitrix_base_app',
    'bitrix_spa',
    'Bitrix_custom',
    'corsheaders',
    'Service_Desk',
    'Service_Desk_Client_verification',
    'Task_Dashboard',
    'visa_process',
    "SCM_PG",
    'Website_API',
    'Customer',
    'Deals',
    'Project_Management',
    'Proposal_Management'
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'Bitrix_Main.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
            'libraries' : {
                'staticfiles': 'django.templatetags.static', 
            }
        },
    },
]

WSGI_APPLICATION = 'Bitrix_Main.wsgi.application'

CSRF_TRUSTED_ORIGINS = ['https://*.green.com.pg','https://*.127.0.0.1','https://gprogress.green.com.pg','http://gprogress.green.com.pg']
# custome database
DATABASES = {
     'default': {
         'ENGINE': 'django.db.backends.postgresql_psycopg2',
         'NAME': 'gprogress',
         'USER': 'postgres',
         'PASSWORD': 'postgres',
         'HOST': '127.0.0.1',
         'PORT': '5432'
     }
 }


# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


STATIC_URL = '/static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, "static"), ]
SESSION_EXPIRE_AT_BROWSER_CLOSE = False
SESSION_COOKIE_AGE = 1200 * 60 #
DATA_UPLOAD_MAX_MEMORY_SIZE = None

# autofiled error
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# media imageupload path
DATA_UPLOAD_MAX_MEMORY_SIZE = None
# MEDIA_ROOT = '/home/digitall/.gprogress/'
MEDIA_ROOT = '/var/www/gpros/.gprogress/'
os.path.join(BASE_DIR, "media")
MEDIA_URL = "/media/"
APPLICATION_URL = "https://gprogress.green.com.pg/"
APPLICATION_PATH = "/var/www/gpros/GProgress/"


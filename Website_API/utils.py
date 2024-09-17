import phonenumbers
from phonenumbers import geocoder, timezone

def parse_phone_number(phone_number):
    try:
        formatted_number = "+" + phone_number
        parsed_number = phonenumbers.parse(formatted_number, None)
        country_code = phonenumbers.format_number(
            parsed_number, phonenumbers.PhoneNumberFormat.INTERNATIONAL
        )
        national_format = phonenumbers.format_number(
            parsed_number, phonenumbers.PhoneNumberFormat.NATIONAL
        )
        return {
            "country_code": country_code,
            "national_format": national_format,
            "valid": phonenumbers.is_valid_number(parsed_number),
            "region": geocoder.description_for_number(parsed_number, "en"),
            "timezone": timezone.time_zones_for_number(parsed_number),
        }
    except phonenumbers.NumberParseException:
        return {"error": "Invalid phone number"}
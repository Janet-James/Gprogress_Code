from jinja2 import Template

data = {
    "Box 1": {
        "box_detail": {"gross_weight": 123, "net_weight": 234, "length": 23, "width": 23, "height": 123},
        "item_detail": [
            {"name": "DC Distribution Board - 3in-3out DC Distribution Board with Fuse, SPD - 10KW 1000V 2MPPT",
             "quantity": "8 pcs."},
            {"name": "Array Junction Box - Automatic Transfer Switch Panel", "quantity": "1 pcs."}
        ]
    },
    "Box 2": {
        "box_detail": {"gross_weight": 123, "net_weight": 234, "length": 23, "width": 23, "height": 123},
        "item_detail": [
            {"name": "AC Distribution Board - 8-IN-1 Out AC Distribution Board With MCCB, SPD, Meter, IL - 90KW",
             "quantity": "1 pcs."},
            {"name": "Plain Box-03 In_08 Out Battery Distribution Box", "quantity": "1 pcs."}
        ]
    },
    "Box 1 Duplicate": {
        "box_detail": {"gross_weight": 123, "net_weight": 234, "length": 23, "width": 23, "height": 123},
        "item_detail": [
            {"name": "AC Distribution Board - 8-IN-1 Out AC Distribution Board With MCCB, SPD, Meter, IL - 90KW",
             "quantity": "1 pcs."},
            {"name": "Plain Box-03 In_08 Out Battery Distribution Box", "quantity": "1 pcs."}
        ]
    },
    "Box 2 Duplicate": {
        "box_detail": {"gross_weight": 123, "net_weight": 234, "length": 23, "width": 23, "height": 123},
        "item_detail": [
            {"name": "AC Distribution Board - 8-IN-1 Out AC Distribution Board With MCCB, SPD, Meter, IL - 90KW",
             "quantity": "1 pcs."},
            {"name": "Plain Box-03 In_08 Out Battery Distribution Box", "quantity": "1 pcs."}
        ]
    }
}

# Jinja2 Template for HTML
html_template = Template("""
<!DOCTYPE html>
<html>
<head>
  <title>Box Details</title>
  <style>
    table {
      border-collapse: collapse;
      width: 100%;
    }
    th, td {
      border: 1px solid black;
      padding: 8px;
      text-align: left;
    }
  </style>
</head>
<body>

{% for box_no, box_data in data.items() %}
  <table>
    <thead>
      <tr>
        <th>Box No</th>
        <th>Gross Weight</th>
        <th>Net Weight</th>
        <th>Length</th>
        <th>Width</th>
        <th>Height</th>
        <th>Item Name</th>
        <th>Quantity</th>
      </tr>
    </thead>
    <tbody>
      {% set rowspan = loop.length %}
      {% for other_box, other_data in data.items() %}
        {% if other_box != box_no %}
          <tr>
            <td>{{ other_box }}</td>
            <td>{{ other_data.box_detail.gross_weight }}</td>
            <td>{{ other_data.box_detail.net_weight }}</td>
            <td>{{ other_data.box_detail.length }}</td>
            <td>{{ other_data.box_detail.width }}</td>
            <td>{{ other_data.box_detail.height }}</td>
            {% for item_detail in other_data.item_detail %}
              <td>{{ item_detail.name }}</td>
              <td>{{ item_detail.quantity }}</td>
            {% endfor %}
          </tr>
        {% endif %}
      {% endfor %}
      {% for item_detail in box_data.item_detail %}
        <tr>
          {% if loop.index == 1 %}
            <td rowspan="{{ rowspan }}">{{ box_no }}</td>
          {% endif %}
          <td>{{ box_data.box_detail.gross_weight }}</td>
          <td>{{ box_data.box_detail.net_weight }}</td>
          <td>{{ box_data.box_detail.length }}</td>
          <td>{{ box_data.box_detail.width }}</td>
          <td>{{ box_data.box_detail.height }}</td>
          <td>{{ item_detail.name }}</td>
          <td>{{ item_detail.quantity }}</td>
        </tr>
      {% endfor %}
    </tbody>
  </table>
{% endfor %}

</body>
</html>
""")

# Render the HTML using the template and data
rendered_html = html_template.render(data=data)

# Save the HTML to a file
with open("box_details.html", "w") as file:
    file.write(rendered_html)

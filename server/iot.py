import serial
import requests

# Configure serial port
ser = serial.Serial('COM5', 9600)  # Replace 'COM3' with the port Arduino is connected to
ser.flushInput()

# Configure server endpoint
url = 'https://pizo-dance.vercel.app/api/data'  # Replace with your server endpoint

try:
    while True:
        if ser.in_waiting > 0:
            # Read data from serial port
            data = ser.readline().decode().strip()
            
            # Extract numerical value from the received data
            voltage_str = data.split(':')[-1].strip().split()[0]
            
            try:
                voltage = float(voltage_str)
                
                # Convert voltage to JSON format
                payload = {'voltage': voltage}
                
                # Send data to server
                response = requests.post(url, json=payload)
                
                if response.status_code == 201:
                    print('Data sent successfully:', voltage)
                else:
                    print('Failed to send data to server:', voltage)
            except ValueError:
                print('Invalid data received from Arduino:', data)
except KeyboardInterrupt:
    ser.close()
    print('Serial port closed')

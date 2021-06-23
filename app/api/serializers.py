from rest_framework import serializers

from .models import Class, Enroll, StudentAttendance

class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value

class AttendancePOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentAttendance
        fields = '__all__'

class AttendanceGETSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentAttendance
        fields = '__all__'
        depth=1


class ClassSerializer(serializers.ModelSerializer):
    user = StringSerializer(many=False)
    # image= AttendanceSerializer(source='classimage_set', many=False, read_only=True)
    class Meta:
        model = Class
        fields = ('__all__')
        depth=1
    

        


class EnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enroll
        fields = ('__all__')
        

    # def create(self, validated_data):
    #     student_id=validated_data.get('student_id')
    #     class_id= validated_data.get('class_id')
        
    #     enroll = Enroll.objects.create(
    #         student_id= student_id,
    #         class_id=class_id
            
    #     )
       
        
    #     return enroll
    



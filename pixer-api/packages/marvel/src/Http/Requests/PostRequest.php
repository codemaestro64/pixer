<?php


namespace Marvel\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Marvel\Enums\WithdrawStatus;

class PostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'user_id'     => ['nullable', 'exists:Marvel\Database\Models\User,id'],
            'title' => ['nullable', 'string'],
            'categories' => ['nullable', 'string'],
            'sub_categories' => ['nullable', 'string'],
            'descr' => ['nullable', 'string'],
            'keywords' => ['nullable', 'string'],
            'attachments' => ['array'],
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}

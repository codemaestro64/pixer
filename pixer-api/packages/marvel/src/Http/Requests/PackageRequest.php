<?php


namespace Marvel\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Marvel\Enums\WithdrawStatus;

class PackageRequest extends FormRequest
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
            'gig_id'     => ['nullable', 'exists:Marvel\Database\Models\Gig,id'],
            'title' => ['nullable', 'string'],
            'name' => ['nullable', 'string'],
            'price' => ['nullable', 'string'],
            'descr' => ['nullable', 'string'],
            'keywords' => ['nullable', 'string'],
            'delivery' => ['nullable', 'string'],
            'revision' => ['nullable', 'string'],
            'additional_banner'      => ['boolean'],
            'additional_source'      => ['boolean'],
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}
